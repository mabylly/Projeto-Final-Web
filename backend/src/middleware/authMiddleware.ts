// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    res.status(401).json({ error: 'Token requerido' });
    return;
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(403).json({ error: 'Token inválido ou expirado' });
      return;
    }
    
    req.user = decoded as AuthRequest['user'];
    next();
  });
};

// middleware para autenticação opcional
// Isso permite que algumas rotas sejam acessadas sem um token, mas ainda assim verifica se o token é válido se fornecido.
// Usado para salvar os resultados de busca
export const optionalAuthenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  // AQUI ESTÁ A ÚNICA DIFERENÇA:
  // Se não houver token, não há problema. Apenas continuamos para a próxima etapa.
  if (!token) {
    return next();
  }

  // Se houver um token, nós o verificamos normalmente.
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    // Se o token for inválido, nós barramos a requisição.
    if (err) {
      return res.status(403).json({ error: 'Token fornecido é inválido ou expirado' });
    }
    
    // Se for válido, adicionamos o usuário à requisição.
    req.user = decoded as AuthRequest['user'];
    next();
  });
};