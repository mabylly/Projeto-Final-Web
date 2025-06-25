import { Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { validateAndNormalizeData } from '../services/validationService';
import { getPedagogiaPrompt } from '../prompts/pedagogiaPrompt';
import { searchService } from '../services/searchService';
import { AuthRequest } from '../middleware/authMiddleware';


export const generateContent = async (req: AuthRequest, res: Response) => {
  try {

    const { topic, grade } = req.body;
    if (!topic || !grade) {
      res.status(400).json({ error: 'Tópico e série são obrigatórios.' });
      return;
    }

    // Logica para chamar IA
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const prompt = getPedagogiaPrompt(topic, grade); // Gera o prompt com base no tópico e série fornecidos
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Tratamento de erros da resposta em json
    const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
    const validatedData = validateAndNormalizeData(jsonResponse);

    // envia a resposta validada
    res.status(200).json(validatedData);

    if (req.user) {
      const userId = req.user.id;
      searchService.saveSearchResult({
        userId,
        topic,
        grade,
        results: validatedData
      }).catch(err => {
      console.error(`Falha assíncrona ao salvar a busca para o usuário ${userId}:`, err);
    });
    } else {
      console.log("Busca por usuário anônimo. Não será salva no histórico.");
    }

  } catch (error) {
    console.error('Erro no controller do Gemini:', error);
    res.status(500).json({ error: 'Falha ao gerar conteúdo.' });
  }
};