import logger from "@/utils/logger";
import prisma from "../../../../prisma/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id: Number(id) },
      });

      if (!recipe) {
        return res.status(404).json({ error: "Recipe not found" });
      }

      res.status(200).json(recipe);
    } catch (error) {
      logger.error("Error fetching recipe:", error);
      res.status(500).json({ error: "Failed to fetch recipe" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "POST") {
    try {
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          isFavorite: true, 
        },
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      logger.error("Error adding to favorites:", error);
      res.status(500).json({ error: "Failed to update favorite status" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "PUT") {
    try {
      const { ingredients, instructions, location, notes, isFavorite } =
        req.body;
      const updatedRecipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: {
          ...(ingredients !== undefined && { ingredients }),
          ...(instructions !== undefined && { instructions }),
          ...(location !== undefined && { location }),
          ...(notes !== undefined && { notes }),
          ...(isFavorite !== undefined && { isFavorite }),
        },
      });

      res.status(200).json(updatedRecipe);
    } catch (error) {
      logger.error("Error updating recipe:", error);
      res.status(500).json({ error: "Failed to update recipe" });
    } finally {
      await prisma.$disconnect();
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedRecipe = await prisma.recipe.delete({
        where: { id: Number(id) },
      });

      res.status(200).json(deletedRecipe);
    } catch (error) {
      logger.error("Error deleting recipe:", error);
      res.status(500).json({ error: "Failed to delete recipe" });
    } finally {
      await prisma.$disconnect();
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
