import express from 'express';
import { generateContent } from '../controllers/geminiController';
import { getHistory } from '../controllers/historyController';
import { optionalAuthenticateToken, authenticateToken } from '../middleware/authMiddleware';

const router = express.Router(); 

// Quando uma requisição POST chegar em /generate, chame a função generateContent
router.post('/generate', optionalAuthenticateToken, generateContent);
router.get('/history', authenticateToken, getHistory);

export default router;