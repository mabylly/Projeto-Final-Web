import type { LoginData, RegisterData, AuthResponse, User, HealthCheckResponse } from '../types/authd';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class AuthService {
  private getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  private getAuthHeaders() {
    const token = this.getToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.error || `Erro HTTP ${response.status}`);
    }
    return result;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await this.handleResponse<AuthResponse>(response);
      this.setToken(result.token);
      return result;
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    }
  }

  async login(data: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await this.handleResponse<AuthResponse>(response);
      this.setToken(result.token);
      return result;
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    }
  }

  async getCurrentUser(): Promise<{ user: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: this.getAuthHeaders()
      });
      return await this.handleResponse<{ user: User }>(response);
    } catch (error) {
      console.error('Erro ao obter usuário atual:', error);
      throw error;
    }
  }

  async updateProfile(name: string): Promise<{ user: User; message: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ name })
      });
      return await this.handleResponse<{ user: User; message: string }>(response);
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Tentar fazer logout no servidor 
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });
    } catch (error) {
      console.error('Erro no logout do servidor:', error);
      // Continuar mesmo se der erro no servidor
    } finally {
      // Remover o token do localStorage
      this.removeToken();
    }
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Verificar se o token não está expirado
      const payload = this.decodeTokenPayload(token);
      if (!payload) return false;
      
      const now = Date.now() / 1000;
      
      if (payload.exp && payload.exp < now) {
        this.removeToken();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao verificar token:', error);
      this.removeToken();
      return false;
    }
  }

  async healthCheck(): Promise<HealthCheckResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await this.handleResponse<HealthCheckResponse>(response);
    } catch (error) {
      console.error('Erro no health check:', error);
      throw error;
    }
  }

  // Método para decodificar token com UTF-8 adequado
  private decodeTokenPayload(token: string): any {
    try {
      // Separar as partes do token
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      // Decodificar o payload (segunda parte)
      const payload = parts[1];
      
      // Adicionar padding se necessário
      const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);
      
      // Decodificar de base64 para string
      const decodedString = atob(paddedPayload);
      
      // Converter string para UTF-8 adequadamente
      const utf8String = decodeURIComponent(escape(decodedString));
      
      return JSON.parse(utf8String);
    } catch (error) {
      console.error('Erro ao decodificar payload do token:', error);
      return null;
    }
  }

  getUserFromToken(): { id: string; email: string; name: string } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = this.decodeTokenPayload(token);
      if (!payload) return null;

      return {
        id: payload.id,
        email: payload.email,
        name: payload.name
      };
    } catch (error) {
      console.error('Erro ao obter usuário do token:', error);
      return null;
    }
  }
}

export const authService = new AuthService();