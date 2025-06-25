import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { validateAndNormalizeData } from '../services/validationService';
import { getPedagogiaPrompt } from '../prompts/pedagogiaPrompt';


export const generateContent = async (req: Request, res: Response) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const { topic, grade } = req.body;

    if (!topic || !grade) {
      res.status(400).json({ error: 'Tópico e série são obrigatórios.' });
      return;
    }

    
    const prompt = getPedagogiaPrompt(topic, grade); // Gera o prompt com base no tópico e série fornecidos
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Limpa e parseia a resposta JSON
    const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());

    const validatedData = validateAndNormalizeData(jsonResponse);

    res.status(200).json(validatedData);

  } catch (error) {
    console.error('Erro no controller do Gemini:', error);
    res.status(500).json({ error: 'Falha ao gerar conteúdo.' });
  }
};