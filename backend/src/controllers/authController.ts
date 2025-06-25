import { Request, Response } from 'express';
import { userService } from '../services/userService';
import { generateToken } from '../utils/jwtUtils';
import { AuthRequest } from '../middleware/authMiddleware';

// Função para tratar erros de forma padronizada
const handleError = (res: Response, error: any, context: string) => {
  console.error(`Erro em ${context}:`, error);
  // Retorna erros específicos se a mensagem for conhecida, senão um erro genérico
  if (error.message.includes('Credenciais inválidas') || error.message.includes('Usuário já existe')) {
    return res.status(400).json({ error: error.message });
  }
  if (error.message.includes('Usuário não encontrado')) {
    return res.status(404).json({ error: error.message });
  }
  return res.status(500).json({ error: 'Erro interno do servidor.' });
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const newUser = await userService.register({ name, email, password });
    const token = generateToken({ 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name 
    });
    const { password: _, ...userWithoutPassword } = newUser;

    return res.status(201).json({ user: userWithoutPassword, token });
  } catch (error) {
    return handleError(res, error, 'register');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await userService.login(email, password);
    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      name: user.name 
    });
    const { password: _, ...userWithoutPassword } = user;

    return res.json({ user: userWithoutPassword, token });
  } catch (error) {
    return handleError(res, error, 'login');
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });
    
    const userProfile = await userService.getUserProfile(req.user.id);
    return res.json({ user: userProfile });
  } catch (error) {
    return handleError(res, error, 'getCurrentUser');
  }
};

export const updateProfile = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: 'Não autorizado' });

    const { name } = req.body;
    const updatedUser = await userService.updateUserProfile(req.user.id, { name });
    const { password: _, ...userWithoutPassword } = updatedUser;
    
    return res.json({ message: 'Perfil atualizado com sucesso', user: userWithoutPassword });
  } catch (error) {
    return handleError(res, error, 'updateProfile');
  }
};

// As funções de logout e healthCheck não precisam de lógica de negócio complexa,
// então podem permanecer como estão.
export const logout = (req: Request, res: Response) => {
  res.json({ message: 'Logout realizado com sucesso' });
};

export const healthCheck = (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
};