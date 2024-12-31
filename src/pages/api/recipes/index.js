import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const handler = async (req, res) => {
  const { method } = req;
  const { id } = req.query; 

  console.log('Received user ID:', id); 

  if (method === 'GET') {
    if (!id) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    try {
      const recipes = await prisma.recipe.findMany({
        where: { userId: Number(id) }, 
      });

      return res.status(200).json(recipes); 
    } catch (error) {
      console.error('Error fetching recipes:', error);
      return res.status(500).json({ error: 'Failed to fetch recipes' });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};

export default handler;