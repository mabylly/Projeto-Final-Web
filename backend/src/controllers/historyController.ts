// src/controllers/historyController.ts

import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import { historyRepository } from '../repositories/historyRepository';

/**
 * Busca a lista de histórico para o usuário autenticado.
 * Responde à rota GET /api/history
 */
export const getHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user!.id;

  try {
    const history = await historyRepository.findByUserId(userId);
    res.status(200).json(history);
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    res.status(500).json({ error: 'Falha ao buscar o histórico do usuário.' });
  }
};

/**
 * Busca os detalhes de um item de histórico específico.
 * Responde à rota GET /api/history/:id
 */
// MUDANÇA 1: Adicionamos o tipo de retorno explícito: Promise<void>
export const getHistoryDetails = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user!.id;

  try {
    const searchDetails = await historyRepository.findSearchDetailsById(id);
    
    if (!searchDetails || searchDetails.userId !== userId) {
      // MUDANÇA 2: Removemos a palavra 'return' daqui
      res.status(404).json({ error: 'Registro de histórico não encontrado ou não pertence a este usuário.' });
      return; // Adicionamos um return vazio para garantir que a função pare aqui.
    }

  const results = searchDetails.resultCards.map(card => ({
    id: card.id,
    type: card.type,
    title: card.title,
    content: card.content,
  }));
    res.status(200).json(results);
    
  } catch (error) {
    console.error('Erro ao buscar detalhes do histórico:', error);
    res.status(500).json({ error: 'Falha ao buscar detalhes do histórico.' });
  }
};