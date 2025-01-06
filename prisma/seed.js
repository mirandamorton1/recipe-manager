import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

const hashPassword = (password, salt) => {
  return crypto.createHmac('sha256', salt)
    .update(password)
    .digest('hex');
};

async function main() {
  const salt = crypto.randomBytes(16).toString('hex'); 
  const hashedPassword = hashPassword("secure_password", salt); 

  const adminUser = await prisma.user.create({
    data: {
      name: "Admin User",
      email: "admin1@mail.com",
      password: hashedPassword,
      salt: salt,
      role: 'ADMIN', 
      isActive: true,
      recipes: {
        create: [], 
      },
    },
  });

  console.log({ adminUser });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
