import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;
const HASH_ALGORITHM = 'sha256';

const hashPassword = (password, salt) => {
  return crypto.createHmac(HASH_ALGORITHM, salt)
    .update(password)
    .digest('hex');
};

const signupHandler = async (req, res) => {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;
    console.log('Received request body:', req.body);

    try {
      console.log('Hashing password for user:', email);
      
      const salt = crypto.randomBytes(16).toString('hex'); 
      const hashedPassword = hashPassword(password, salt); 

      console.log('Password hashed successfully:', hashedPassword);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          salt, 
        },
      });

      console.log('User created successfully:', user);

      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } 
      );

      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`
      );

      console.log(`[INFO] Signup successful for user ID: ${user.id}`);
      return res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      console.error('Error occurred during user creation:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default signupHandler;
