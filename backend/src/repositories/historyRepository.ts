// src/repositories/historyRepository.ts

import { prisma } from '../lib/prisma';

export const historyRepository = {


  findByUserId: async (userId: string) => {
    return prisma.search.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc', // Ordena para mostrar os mais recentes primeiro
      },
      // Seleciona apenas os campos que o frontend precisa para a lista
      select: {
        id: true,
        topic: true,
        grade: true,
        createdAt: true,
      },
    });
  },


  findSearchDetailsById: async (searchId: string) => {
    return prisma.search.findUnique({
      where: {
        id: searchId,
      },
      include: {
        // Inclui os 'ResultCard' relacionados na resposta do banco de dados
        resultCards: {
          orderBy: {
            order: 'asc', // Garante que os cards venham na ordem original
          },
        },
      },
    });
  },
};