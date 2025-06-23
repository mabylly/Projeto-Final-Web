import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwtUtils';
import { findUserByEmail, createUser, findUserById, updateUser } from '../models/userModels';
import { AuthRequest } from '../middleware/authMiddleware';

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    // Validação básica
    if (!name || !email || !password) {
      res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      return;
    }

    // Verificar se usuário já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400).json({ error: 'Usuário já existe com este email' });
      return;
    }

    // Hash da senha
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Criar usuário
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword
    });

    // Gerar token
    const token = generateToken({ 
      id: newUser.id, 
      email: newUser.email, 
      name: newUser.name 
    });

    // Retornar sem a senha
    const { password: _, ...userWithoutPassword } = newUser;

    res.status(201).json({
      message: 'Usuário cadastrado com sucesso',
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validação básica
    if (!email || !password) {
      res.status(400).json({ error: 'Email e senha são obrigatórios' });
      return;
    }

    const user = await findUserByEmail(email);
    if (!user) {
      res.status(400).json({ error: 'Usuário não encontrado' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Senha incorreta' });
      return;
    }

    const token = generateToken({ 
      id: user.id, 
      email: user.email, 
      name: user.name 
    });

    // Retornar sem a senha
    const { password: _, ...userWithoutPassword } = user;

    res.json({ 
      message: 'Login bem-sucedido', 
      token, 
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const getCurrentUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const user = await findUserById(req.user.id);
    if (!user) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Retornar sem a senha
    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword });

  } catch (error) {
    console.error('Erro ao obter usuário atual:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Usuário não autenticado' });
      return;
    }

    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: 'Nome é obrigatório' });
      return;
    }

    const updatedUser = await updateUser(req.user.id, { name });
    if (!updatedUser) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    // Retornar sem a senha
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.json({ 
      message: 'Perfil atualizado com sucesso',
      user: userWithoutPassword 
    });

  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // Como estamos usando JWT stateless, o logout é feito no frontend
  // Aqui podemos apenas confirmar o logout
  res.json({ message: 'Logout realizado com sucesso' });
};

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  res.json({ 
    status: 'ok', 
    message: 'API está funcionando corretamente',
    timestamp: new Date().toISOString()
  });
};