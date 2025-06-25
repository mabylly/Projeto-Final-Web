import { prisma } from '../lib/prisma';
import type { Result } from '../types/result'; 

export const searchRepository = {
  /**
   * Cria um novo registro de Search e todos os seus ResultCards associados
   * dentro de uma única transação para garantir a integridade dos dados.
   */
  createSearchWithResults: async (userId: string, topic: string, grade: string, results: Result[]) => {
    
    return prisma.search.create({
      data: {
        topic,
        grade,
        // Conecta a busca ao usuário que a realizou
        user: {
          connect: {
            id: userId,
          },
        },
        // Cria todos os cards de resultado de uma só vez
        resultCards: {
          create: results.map((result, index) => ({
            id: result.id, // Reutilizamos o ID da IA para consistência
            type: result.type,
            title: result.title,
            order: index, // Salvamos a ordem para exibir corretamente
            content: result.content as any, // O Prisma aceita o objeto JSON
          })),
        },
      },
      // Incluímos os cards na resposta para confirmar que foram criados
      include: {
        resultCards: true,
      }
    });
  },
};