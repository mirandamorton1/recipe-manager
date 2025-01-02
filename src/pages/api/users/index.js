import prisma from '../../../../prisma/prisma';

const handler = async (req, res) => {
  if (req.method === "PUT") {
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
      console.error(error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
};

export default handler;
