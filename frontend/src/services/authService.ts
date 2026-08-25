import api from './api';
import type { User, LoginCredentials, RegisterCredentials } from '../types';

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  error?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return api.post('/auth/login', credentials);
  },

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return api.post('/auth/register', credentials);
  },

  async getMe(): Promise<{ success: boolean; data?: User; error?: string }> {
    return api.get('/auth/me');
  },

  async logout(): Promise<void> {
    return api.post('/auth/logout');
  }
};
