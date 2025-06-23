import express from 'express';
import { generateContent } from '../controllers/geminiController';

const router = express.Router(); 

// Quando uma requisição POST chegar em /generate, chame a função generateContent
router.post('/generate', generateContent);

export default router;