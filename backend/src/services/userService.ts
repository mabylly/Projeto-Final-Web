import bcrypt from 'bcryptjs';
import { userRepository } from '../repositories/userRepository';
import { Prisma } from '@prisma/client';

export const userService = {
  // Lógica de Registro
  async register(data: Prisma.UserCreateInput) {
    const existingUser = await userRepository.findByEmail(data.email);
    if (existingUser) {
      // Lançamos um erro que o controller vai capturar
      throw new Error('Usuário já existe com este email');
    }

    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return userRepository.create({
      ...data,
      password: hashedPassword,
    });
  },

  // Lógica de Login
  async login(email: string, password_plain: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new Error('Credenciais inválidas'); // Mensagem genérica por segurança
    }

    const isMatch = await bcrypt.compare(password_plain, user.password);
    if (!isMatch) {
      throw new Error('Credenciais inválidas');
    }

    return user;
  },

  // Lógica de Atualização de Perfil
  async updateUserProfile(userId: string, data: { name?: string }) {
    if (!data.name) {
      throw new Error('O nome é obrigatório para atualização.');
    }
    return userRepository.update(userId, { name: data.name });
  },

  // Lógica para buscar um usuário para exibição
  async getUserProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    // Remove a senha antes de retornar
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
};