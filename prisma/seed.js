const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john.doe@example.com",
      password: "hashed_password",
      recipes: {
        create: [
          {
            title: "Spaghetti Bolognese",
            type: "Dinner",
            ingredients: ["Spaghetti", "Ground Beef", "Tomato Sauce"],
            instructions: ["Boil pasta", "Cook meat", "Mix together"],
            notes: "Family favorite!",
            location: "Grandma's Cookbook, Page 10",
            photo: "https://example.com/spaghetti.jpg",
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
