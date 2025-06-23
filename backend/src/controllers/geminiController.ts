import { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';




export const generateContent = async (req: Request, res: Response) => {
  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const { topic, grade } = req.body;

    if (!topic || !grade) {
      res.status(400).json({ error: 'Tópico e série são obrigatórios.' });
      return;
    }

    // O prompt detalhado para a IA
    const prompt = `
      Você é um assistente pedagógico especializado fluente em Português do Brasil.
      Sua tarefa é criar um conjunto de recursos educacionais sobre o tópico "${topic}" para alunos do ${grade}.

      Gere a resposta EXATAMENTE no seguinte formato JSON, sem adicionar nenhum texto ou formatação extra antes ou depois do JSON.

      O formato deve ser um array de objetos. Tente incluir uma variedade de tipos de recursos da lista de tipos possíveis.

      Estrutura de cada objeto:
      - "id": uma string única e descritiva em formato kebab-case.
      - "type": uma das seguintes strings: "definition", "curiosities", "multiple_choice_question", "open_ended_question", "video_links".
      - "title": um título claro e conciso para o card.
      - "content": um objeto cujo conteúdo varia de acordo com o "type".

      Todo o texto gerado deve estar em Português do Brasil.

      Exemplo de estrutura de resposta JSON que você DEVE seguir:
      [
        { 
          "id": "def-exemplo", 
          "type": "definition", 
          "title": "Definição do Tópico", 
          "content": { "text": "Um texto claro e conciso sobre a definição do tópico." } 
        },
        { 
          "id": "cur-exemplo", 
          "type": "curiosities", 
          "title": "Curiosidades", 
          "content": { "items": ["Uma lista de strings com curiosidades.", "Cada string é um item da lista."] } 
        },
        { 
          "id": "mcq-exemplo", 
          "type": "multiple_choice_question", 
          "title": "Atividade: Múltipla Escolha", 
          "content": { 
            "questions": [
              { "id": "q1-exemplo", "question": "Texto da pergunta aqui...", "options": ["Opção A", "Opção B", "Opção C"], "correctAnswerIndex": 1 }
            ] 
          } 
        },
        {
          "id": "oeq-exemplo",
          "type": "open_ended_question",
          "title": "Atividade: Pergunta Dissertativa",
          "content": { "prompt": "O texto da pergunta dissertativa deve estar na chave 'prompt'." } 
        },
        {
          "id": "vid-exemplo",
          "type": "video_links",
          "title": "Vídeos Sugeridos",
          "content": { 
            "videos": [
              { "id": "vid-yt-123", "title": "Título do Vídeo 1", "url": "https://www.youtube.com/watch?v=exemplo1", "platform": "YouTube" }
            ] 
          }
        }
      ]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Limpa e parseia a resposta JSON
    const jsonResponse = JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());

    res.status(200).json(jsonResponse);

  } catch (error) {
    console.error('Erro no controller do Gemini:', error);
    res.status(500).json({ error: 'Falha ao gerar conteúdo.' });
  }
};