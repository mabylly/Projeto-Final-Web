import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export const generateToken = (user: { id: string; email: string; name: string }) => {
  // Garantir que o nome seja tratado corretamente em UTF-8
  const userData = {
    id: user.id,
    email: user.email,
    name: user.name 
  };
  
  return jwt.sign(userData, JWT_SECRET, { expiresIn: '7d' });
};

// Função auxiliar para decodificar token com tratamento de UTF-8
export const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET) as { id: string; email: string; name: string };
  } catch (error) {
    console.error('Erro ao decodificar token:', error);
    return null;
  }
};