import prisma from "../../../../prisma/prisma";
import logger from "@/utils/logger";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const users = await prisma.user.findMany({
        select: { id: true, name: true, email: true, createdAt: true, isActive: true },
      });
      return res.status(200).json(users);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Failed to fetch users" });
    }
  } else if (req.method === "PUT") {
    const { id, name, email } = req.body;

    if (!id || !name || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: { name, email },
      });

      return res.status(200).json(updatedUser);
    } catch (error) {
      logger.error(error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
