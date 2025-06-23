import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Interface para manter compatibilidade com o código existente
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

// Buscar usuário por email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email
      }
    });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    return null;
  }
};

// Buscar usuário por ID
export const findUserById = async (id: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id
      }
    });
    return user;
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    return null;
  }
};

// Criar novo usuário
export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    });
    return newUser;
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    throw new Error('Erro ao criar usuário no banco de dados');
  }
};

// Atualizar usuário
export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        ...(updates.name && { name: updates.name }),
        ...(updates.email && { email: updates.email }),
        ...(updates.password && { password: updates.password })
      }
    });
    return updatedUser;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return null;
  }
};

// Função para fechar a conexão do Prisma 
export const closePrismaConnection = async () => {
  await prisma.$disconnect();
};

// Função para testar a conexão 
export const testConnection = async () => {
  try {
    await prisma.$connect();
    console.log('Conexão com banco de dados estabelecida com sucesso');
    return true;
  } catch (error) {
    console.error('Erro ao conectar com banco de dados:', error);
    return false;
  }
};