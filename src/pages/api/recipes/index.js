import prisma from '../../../../prisma/prisma'


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

  if (method === 'POST') {
    const { title, type, ingredients, instructions, notes, location, userId } = req.body;

    if (!title || !type || !ingredients || !instructions || !userId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
      const newRecipe = await prisma.recipe.create({
        data: {
          title,
          type,
          ingredients,
          instructions,
          notes,
          location,
          userId: Number(userId), 
        },
      });

      return res.status(201).json(newRecipe);
    } catch (error) {
      console.error('Error creating recipe:', error);
      return res.status(500).json({ error: 'Failed to create recipe' });
    } finally {
      await prisma.$disconnect();
    }
  }

  return res.status(405).json({ error: 'Method Not Allowed' });
};

export default handler;