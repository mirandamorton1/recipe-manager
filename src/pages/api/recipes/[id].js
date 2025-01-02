import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id: Number(id) },
      });

      if (!recipe) {
        return res.status(404).json({ error: 'Recipe not found' });
      }

      res.status(200).json(recipe);
    } catch (error) {
      console.error('Error fetching recipe:', error);
      res.status(500).json({ error: 'Failed to fetch recipe' });
    } finally {
      await prisma.$disconnect();
    }
  }

  else if (req.method === 'POST') {
    try {
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          isFavorite: true, // Mark the recipe as a favorite
        },
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      res.status(500).json({ error: 'Failed to update favorite status' });
    } finally {
      await prisma.$disconnect();
    }
  }

  // Handle the "DELETE" request to remove from favorites
  else if (req.method === 'DELETE') {
    try {
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          isFavorite: false, // Remove the recipe from favorites
        },
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      res.status(500).json({ error: 'Failed to update favorite status' });
    } finally {
      await prisma.$disconnect();
    }
  }

  else if (req.method === 'PUT') {
    const { title, ingredients, instructions, notes } = req.body;

    try {
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          title,
          ingredients,
          instructions,
          notes,
        },
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      console.error('Error updating recipe:', error);
      res.status(500).json({ error: 'Failed to update recipe' });
    } finally {
      await prisma.$disconnect();
    }
  }

  else if (req.method === 'DELETE') {
    try {
      const deletedRecipe = await prisma.recipe.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(deletedRecipe);
    } catch (error) {
      console.error('Error deleting recipe:', error);
      res.status(500).json({ error: 'Failed to delete recipe' });
    } finally {
      await prisma.$disconnect();
    }
  }

  else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
