import express from 'express';
import { generateContent } from '../controllers/geminiController';
import { optionalAuthenticateToken } from '../middleware/authMiddleware';

const router = express.Router(); 

// Quando uma requisição POST chegar em /generate, chame a função generateContent
router.post('/generate', optionalAuthenticateToken, generateContent);

export default router;