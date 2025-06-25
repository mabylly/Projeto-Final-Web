import { prisma } from '../lib/prisma'; // Importa a instância única
import { Prisma, User } from '@prisma/client'; // Importa os tipos gerados pelo Prisma

export const userRepository = {
  findByEmail: async (email: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { email } });
  },

  findById: async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id } });
  },

  create: async (data: Prisma.UserCreateInput): Promise<User> => {
    return prisma.user.create({ data });
  },

  update: async (id: string, data: Prisma.UserUpdateInput): Promise<User> => {
    return prisma.user.update({ where: { id }, data });
  },
};