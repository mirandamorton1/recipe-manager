import authorize from '../../../middleware/authorize';

const meHandler = async (req, res) => {
  if (req.method === 'GET') {
    return res.status(200).json({
      userId: req.user.userId,
      email: req.user.email,
    });
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default authorize(meHandler);
