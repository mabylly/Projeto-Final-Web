import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const generateToken = (user: { id: string; email: string; name: string }) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
};
