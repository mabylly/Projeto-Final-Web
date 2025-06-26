// src/services/historyService.ts

import { authService } from './authServices';
import type { HistoryItem } from '../types/history';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class HistoryService {
  private async getAuthHeaders() {
    // Reutilizamos a lógica do authService para pegar o token
    const token = localStorage.getItem('auth_token'); 
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }
  
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorResult = await response.json();
      throw new Error(errorResult.error || `Erro HTTP ${response.status}`);
    }
    return response.json();
  }

  async fetchHistory(): Promise<HistoryItem[]> {
    const headers = await this.getAuthHeaders();
    if (!headers.Authorization) {
      // Se não há token, não há histórico para buscar.
      return []; 
    }

    const response = await fetch(`${API_BASE_URL}/history`, {
      method: 'GET',
      headers,
    });
    
    return this.handleResponse<HistoryItem[]>(response);
  }
}

export const historyService = new HistoryService();