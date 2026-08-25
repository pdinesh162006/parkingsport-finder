import { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse, AuthRequest } from '../types';

// ── Validation ──
export const addFavoriteSchema = z.object({
  spotId: z.string().min(1, 'spotId is required'),
});

// ── Mock Data ──
const mockFavorites = [
  { id: '1', userId: '1', spotId: '1', spotName: 'Downtown Central Parking', createdAt: '2024-03-10' },
  { id: '2', userId: '1', spotId: '5', spotName: 'Harbor View Parking', createdAt: '2024-03-12' },
];

// ── Controllers ──

export function getFavorites(req: AuthRequest, res: Response<ApiResponse>) {
  res.json({ success: true, data: mockFavorites });
}

export function addFavorite(req: AuthRequest, res: Response<ApiResponse>) {
  const { spotId } = req.body;
  res.status(201).json({
    success: true,
    data: { id: '100', userId: req.user?.userId, spotId, createdAt: new Date().toISOString() },
    message: 'Added to favorites',
  });
}

export function removeFavorite(req: AuthRequest, res: Response<ApiResponse>) {
  const fav = mockFavorites.find(f => f.id === req.params.id);
  if (!fav) { res.status(404).json({ success: false, error: 'Favorite not found' }); return; }
  res.json({ success: true, message: 'Removed from favorites' });
}
