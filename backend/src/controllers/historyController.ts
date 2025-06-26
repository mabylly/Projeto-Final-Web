// src/controllers/historyController.ts

import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { historyRepository } from '../repositories/historyRepository';

export const getHistory = async (req: AuthRequest, res: Response) => {
  // O middleware 'authenticateToken' garante que req.user existe.
  const userId = req.user!.id;

  try {
    const history = await historyRepository.findByUserId(userId);
    res.status(200).json(history);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Falha ao buscar o histórico do usuário.' });
  }
};