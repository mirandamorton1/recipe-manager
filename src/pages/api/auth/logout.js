const handler = async (req, res) => {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      'token=; Max-Age=0; Path=/; HttpOnly; SameSite=Lax; Secure=' + 
      (process.env.NODE_ENV === 'production')
    );

    res.status(200).json({ message: 'Logout successful' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;