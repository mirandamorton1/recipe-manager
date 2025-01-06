import prisma from "../../../../prisma/prisma";
import logger from "@/utils/logger";

const updateUserStatus = async (req, res) => {
    if (req.method === "PATCH") {
      const { id } = req.query;
      const { isActive } = req.body; 
  
      try {
        const updatedUser = await prisma.user.update({
          where: { id: parseInt(id) },
          data: { isActive },
        });
  
        return res.status(200).json(updatedUser); 
      } catch (error) {
        logger.error(error);
        return res.status(500).json({ error: "Failed to update user status" });
      }
    } else {
      res.setHeader("Allow", ["PATCH"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  };
  
  export default updateUserStatus;