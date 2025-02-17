import prisma from '../../../../prisma/prisma'
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import logger from '../../../utils/logger'
import speakeasy from 'speakeasy';

dotenv.config();

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

    const sanitizedEmail = `${email.split("@")[0][0]}*****@${
      email.split("@")[1]
    }`;

    const sanitizedName = "User";

    try {
      // logger.info('Hashing password for user:', `${email}`);
      
      const salt = crypto.randomBytes(16).toString('hex'); 
      const hashedPassword = hashPassword(password, salt); 

      // logger.info('Password hashed successfully:', hashedPassword);

    const secret = speakeasy.generateSecret({ length: 20 });

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          salt, 
          twoFaSecret: secret.base32,
        },
      });

      logger.info(`User created successfully: ${sanitizedName} (${sanitizedEmail})`);

      const twoFAtoken = speakeasy.totp({
        secret: secret.base32,
        encoding: 'base32',
      });

      console.log(`2FA code for ${email}: ${twoFAtoken}`);


      const token = jwt.sign(
        { userId: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: '1h' } 
      );

      res.setHeader(
        'Set-Cookie',
        `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict; Secure`
      );

      logger.info(`[INFO] Signup successful for user ID: ${user.id}`);
      return res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
      logger.error('Error occurred during user creation:', error);
      return res.status(500).json({ message: 'Something went wrong' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default signupHandler;
