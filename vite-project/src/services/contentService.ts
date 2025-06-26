// src/services/contentService.ts

import { authService } from './authServices';
import type { Result } from '../types/result'; // Supondo que você tenha um tipo 'Result'

// Pega a URL da API das variáveis de ambiente ou usa um padrão
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ContentService {
  /**
   * Chama a API para gerar novo conteúdo com base em um tópico e série.
   * Envia o token de autenticação automaticamente se o usuário estiver logado.
   * @param topic O assunto para gerar conteúdo.
   * @param grade A série escolar.
   * @returns Os resultados gerados pela API.
   */
  async generateContent(topic: string, grade: string): Promise<Result[]> {
    // Reutilizamos a lógica que já existe no authService para pegar os headers!
    // Isso garante que o token é adicionado se existir, e não é adicionado se não existir.
    const headers = authService['getAuthHeaders'](); // Acessando método privado para reutilização

    try {
      const response = await fetch(`${API_BASE_URL}/generate`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({ topic, grade }),
      });

      if (!response.ok) {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Falha ao buscar os dados da API.');
      }
      
      return await response.json();

    } catch (error) {
      console.error('Erro no serviço de geração de conteúdo:', error);
      // Re-lança o erro para que o componente que chamou possa tratá-lo
      throw error;
    }
  }
}

export const contentService = new ContentService();