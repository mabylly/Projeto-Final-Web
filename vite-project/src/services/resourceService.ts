// frontend/src/services/resourceService.ts
import { authService } from './authServices';

const API_URL = 'http://localhost:3001/api'; // Ajuste se a URL da sua API for diferente

export const resourceService = {
  getUserHistory: async () => {
    const token = authService.getToken();
    if (!token) {
      throw new Error('Nenhum token de autenticação encontrado.');
    }

    const response = await fetch(`${API_URL}/resources`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao buscar o histórico de recursos.');
    }

    return response.json();
  },
  saveResource: async (resourceData: { topic: string; grade: string; }) => {
    const token = authService.getToken();
    if (!token) {
      throw new Error('Nenhum token de autenticação encontrado.');
    }

    const response = await fetch(`${API_URL}/resources`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resourceData),
    });

    if (!response.ok) {
      throw new Error('Falha ao salvar o recurso.');
    }

    return response.json();
  },
};
