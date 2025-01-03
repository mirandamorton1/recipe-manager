import logger from "@/utils/logger";
import prisma from "../../../../prisma/prisma";
import authorize from '../../../middleware/authorize';

const meHandler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.userId,  
        },
      });

      if (user) {
        logger.info('Fetched user data:', user);

        return res.status(200).json({
          userId: user.id,
          email: user.email,
          name: user.name, 
        });
      } else {
        return res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      logger.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authorize(meHandler);
