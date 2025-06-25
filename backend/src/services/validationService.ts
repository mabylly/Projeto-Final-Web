import { z } from 'zod';
import { Result } from '../types/result'; // Importamos nossos tipos para referência

// 1. Definimos os "moldes" (schemas) com Zod para cada tipo de conteúdo
const DefinitionContentSchema = z.object({ text: z.string() });
const CuriositiesContentSchema = z.object({ items: z.array(z.string()) });
const QuestionSchema = z.object({
  id: z.string(),
  question: z.string(),
  options: z.array(z.string()),
  correctAnswerIndex: z.number(),
});
const MultipleChoiceContentSchema = z.object({ questions: z.array(QuestionSchema) });
const OpenEndedQuestionSchema = z.object({ id: z.string(), prompt: z.string() });
const OpenEndedContentSchema = z.object({ prompts: z.array(OpenEndedQuestionSchema) });
const BookRecommendationSchema = z.object({
  title: z.string(),
  author: z.string(),
  year: z.number(),
  summary: z.string(),
  reasoning: z.string(),
});
const BookRecommendationContentSchema = z.object({ recommendations: z.array(BookRecommendationSchema) });

// 2. Criamos um schema principal usando união discriminada, espelhando nosso tipo Result
const ResultSchema = z.discriminatedUnion('type', [
  z.object({ id: z.string(), type: z.literal('definition'), title: z.string(), content: DefinitionContentSchema }),
  z.object({ id: z.string(), type: z.literal('curiosities'), title: z.string(), content: CuriositiesContentSchema }),
  z.object({ id: z.string(), type: z.literal('multiple_choice_question'), title: z.string(), content: MultipleChoiceContentSchema }),
  z.object({ id: z.string(), type: z.literal('open_ended_question'), title: z.string(), content: OpenEndedContentSchema }),
  z.object({ id: z.string(), type: z.literal('book_recommendation'), title: z.string(), content: BookRecommendationContentSchema }),
]);

// O schema final para a resposta da API é um array de resultados
const ApiResponseSchema = z.array(ResultSchema);


// 3. A função principal que valida e "conserta" os dados
export function validateAndNormalizeData(data: any): Result[] {
  // Primeiro, tentamos validar os dados como estão
  const validationResult = ApiResponseSchema.safeParse(data);

  if (validationResult.success) {
    console.log("Validação Zod passou de primeira!");
    return validationResult.data; // Se os dados estão perfeitos, retornamos
  }

  // Se a validação falhou, tentamos "normalizar" os erros conhecidos
  console.log("Validação Zod falhou, tentando normalizar os dados...");
  
  if (!Array.isArray(data)) {
    throw new Error("A resposta da API não é um array.");
  }

  const normalizedData = data.map((item: any) => {
    let content = item.content;

    // Normalização 1: open_ended_question usa 'question' em vez de 'prompt'
    if (item.type === 'open_ended_question' && content.question && !content.prompts) {
      // O Gemini pode retornar um único objeto em vez de um array
      content = { prompts: [{ id: item.id + '-p1', prompt: content.question }] };
    }

    // Adicione mais regras de normalização aqui conforme necessário...

    return { ...item, content };
  });

  // Tentamos validar novamente com os dados normalizados
  const finalValidation = ApiResponseSchema.safeParse(normalizedData);
  if (finalValidation.success) {
    console.log("Normalização bem-sucedida!");
    return finalValidation.data;
  } else {
    // Se ainda assim falhar, lançamos um erro detalhado
    console.error("Erro de validação final do Zod:", finalValidation.error.flatten());
    throw new Error("Os dados da API são inválidos mesmo após a normalização.");
  }
}