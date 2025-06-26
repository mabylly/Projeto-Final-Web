// src/repositories/historyRepository.ts

import { prisma } from '../lib/prisma';

export const historyRepository = {
  /**
   * Busca o histórico de buscas de um usuário específico, ordenado pela mais recente.
   * @param userId O ID do usuário.
   * @returns Uma lista de buscas do usuário.
   */
  findByUserId: async (userId: string) => {
    return prisma.search.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc', // Ordena para mostrar os mais recentes primeiro
      },
      // Seleciona apenas os campos que o frontend precisa
      select: {
        id: true,
        topic: true,
        grade: true,
        createdAt: true,
      },
    });
  },
};