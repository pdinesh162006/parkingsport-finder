import api from './api';
import type { ParkingSpot } from '../types';

export const parkingService = {
  async getAll(params?: { page?: number; limit?: number }): Promise<{ success: boolean; data: { spots: ParkingSpot[]; total: number } }> {
    return api.get('/parking', { params });
  },

  async getNearby(lat: number, lng: number, radius = 5): Promise<{ success: boolean; data: { spots: ParkingSpot[] } }> {
    return api.get('/parking/nearby', { params: { lat, lng, radius } });
  },

  async getById(id: string): Promise<{ success: boolean; data: ParkingSpot }> {
    return api.get(`/parking/${id}`);
  },

  async create(data: Partial<ParkingSpot>): Promise<{ success: boolean; data: ParkingSpot }> {
    return api.post('/parking', data);
  },

  async update(id: string, data: Partial<ParkingSpot>): Promise<{ success: boolean; data: ParkingSpot }> {
    return api.put(`/parking/${id}`, data);
  },

  async delete(id: string): Promise<{ success: boolean }> {
    return api.delete(`/parking/${id}`);
  }
};
