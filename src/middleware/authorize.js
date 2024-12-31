import jwt from 'jsonwebtoken';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET;

const authorize = (handler) => async (req, res) => {
  // console.log('Request Headers:', req.headers);

  const cookies = parse(req.headers.cookie || '');
  const token = cookies.token;

  if (!token) {
    console.log('No token found in cookies')
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log('Decoded token:', decoded);
    req.user = decoded; 
    return handler(req, res); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authorize;
