import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { generateToken } from '../utils/jwtUtils';
import { AuthRequest } from '../middleware/authMiddleware';

const handleError = (res: Response, error: any, context: string) => {
  console.error(`Erro em ${context}:`, error);
  if (error.message.includes('Credenciais inválidas') || error.message.includes('Usuário já existe')) {
    res.status(400).json({ error: error.message }); 
    return;
  }
  if (error.message.includes('Usuário não encontrado')) {
    res.status(404).json({ error: error.message }); 
    return;
  }
  res.status(500).json({ error: 'Erro interno do servidor.' }); 
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return; 
    }

    const newUser = await userService.register({ name, email, password });
    
    const token = generateToken({ 
      id: newUser.id,
      email: newUser.email,
      name: newUser.name || '',
    });

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword, token }); 
  } catch (error) {
    handleError(res, error, 'register');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios' });
      return;
    }

    const user = await userService.login(email, password);
    const token = generateToken({ id: user.id, email: user.email, name: user.name || '' });
    const { password: _, ...userWithoutPassword } = user;

    res.json({ message: 'Login bem-sucedido', user: userWithoutPassword, token }); 
  } catch (error) {
    handleError(res, error, 'login');
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Não autorizado' });
      return;
    }
    
    const userProfile = await userService.getUserProfile(req.user.id);
    res.json({ user: userProfile }); 
  } catch (error) {
    handleError(res, error, 'getCurrentUser');
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Não autorizado' });
      return;
    }

    const { name } = req.body;
    const updatedUser = await userService.updateUserProfile(req.user.id, { name });
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    res.json({ message: 'Perfil atualizado com sucesso', user: userWithoutPassword }); 
  } catch (error) {
    handleError(res, error, 'updateProfile');
  }
};

export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logout realizado com sucesso' });
};

export const healthCheck = (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};