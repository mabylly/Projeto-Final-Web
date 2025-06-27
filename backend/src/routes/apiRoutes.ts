// src/routes/apiRoutes.ts

import express from 'express';
import { generateContent } from '../controllers/geminiController';
// Importe a nova função do controller
import { getHistory, getHistoryDetails } from '../controllers/historyController';
import { optionalAuthenticateToken, authenticateToken } from '../middleware/authMiddleware';

const router = express.Router(); 

router.post('/generate', optionalAuthenticateToken, generateContent);

// Rotas de Histórico
router.get('/history', authenticateToken, getHistory); // Rota para a lista de histórico
router.get('/history/:id', authenticateToken, getHistoryDetails); // <-- NOVA ROTA para os detalhes

export default router;