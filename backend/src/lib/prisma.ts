import { PrismaClient } from '@prisma/client';

// Cria e exporta uma instância única do Prisma Client para toda a aplicação
export const prisma = new PrismaClient();