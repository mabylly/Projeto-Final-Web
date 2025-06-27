// src/services/historyService.ts

import type { HistoryItem } from '../types/history';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class HistoryService {
  // Método auxiliar para pegar os cabeçalhos de autenticação
  private async getAuthHeaders() {
    const token = localStorage.getItem('auth_token'); 
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }
  
  // Método auxiliar para tratar as respostas da API
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error || `Erro HTTP ${response.status}`);
    }
    return response.json();
  }

  /**
   * Busca a lista de todos os itens de histórico para o usuário logado.
   * @returns Uma promessa que resolve para um array de HistoryItem.
   */
  async fetchHistory(): Promise<HistoryItem[]> {
    const headers = await this.getAuthHeaders();
    // Se não houver token, não há histórico para buscar.
    if (!headers.Authorization) {
      return []; 
    }

    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'GET',
      headers,
    });
    
    return this.handleResponse<HistoryItem[]>(response);
  }

  /**
   * Busca os resultados salvos de um item de histórico específico.
   * @param searchId O ID do item de histórico clicado.
   * @returns Uma promessa que resolve para um array com os resultados salvos.
   */
  async fetchHistoryDetails(searchId: string): Promise<any[]> {
    const headers = await this.getAuthHeaders();
    // Se não houver token, o usuário não deveria conseguir chamar isso.
    if (!headers.Authorization) {
      throw new Error("Usuário não autenticado.");
    }

    // A chamada para a nova rota da API, incluindo o ID do item
    const response = await fetch(`${API_BASE_URL}/history/${searchId}`, {
      method: 'GET',
      headers,
    });
    
    // Usamos 'any[]' aqui porque o formato do resultado pode variar
    return this.handleResponse<any[]>(response);
  }
}

export const historyService = new HistoryService();