import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Hashing function using 'createHmac' (same as your signup logic)
const hashPassword = (password, salt) => {
  return crypto.createHmac('sha256', salt)
    .update(password)
    .digest('hex');
};

async function main() {
  const salt = crypto.randomBytes(16).toString('hex'); // Generate a new salt for seeding
  const hashedPassword = hashPassword("secure_password", salt); // Hash with 'createHmac'

  const user = await prisma.user.create({
    data: {
      name: "Janet Doe",
      email: "janet.doe@example.com",
      password: hashedPassword,
      salt: salt,
      recipes: {
        create: [
          {
            title: "Tacos",
            type: "Beef",
            ingredients: ["Spice packet", "Ground Beef", "Tomato Sauce"],
            instructions: ["Cook meat", "Mix together"],
            notes: "Family favorite!",
            location: "Grandma's Cookbook, Page 50",
            photo: "https://example.com/taco.jpg",
            isFavorite: true,
          },
        ],
      },
    },
  });

  console.log({ user });
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
