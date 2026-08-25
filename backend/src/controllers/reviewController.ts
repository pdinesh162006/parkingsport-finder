import { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse, AuthRequest } from '../types';

// ── Validation ──
export const createReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(3, 'Comment must be at least 3 characters'),
});

export const updateReviewSchema = createReviewSchema.partial();

// ── Mock Data ──
const mockReviews = [
  { id: '1', userId: '1', userName: 'John Doe', spotId: '1', rating: 5, comment: 'Excellent parking!', createdAt: '2024-03-15' },
  { id: '2', userId: '4', userName: 'Bob Wilson', spotId: '1', rating: 4, comment: 'Good location.', createdAt: '2024-03-20' },
];

// ── Controllers ──

export function getReviewsBySpot(req: Request, res: Response<ApiResponse>) {
  const spotReviews = mockReviews.filter(r => r.spotId === req.params.id);
  res.json({ success: true, data: spotReviews });
}

export function createReview(req: AuthRequest, res: Response<ApiResponse>) {
  const { rating, comment } = req.body;
  const newReview = { id: '100', userId: req.user?.userId, userName: 'John Doe', spotId: req.params.id, rating, comment, createdAt: new Date().toISOString() };
  res.status(201).json({ success: true, data: newReview, message: 'Review created' });
}

export function updateReview(req: AuthRequest, res: Response<ApiResponse>) {
  const review = mockReviews.find(r => r.id === req.params.id);
  if (!review) { res.status(404).json({ success: false, error: 'Review not found' }); return; }
  res.json({ success: true, data: { ...review, ...req.body }, message: 'Review updated' });
}

export function deleteReview(req: AuthRequest, res: Response<ApiResponse>) {
  const review = mockReviews.find(r => r.id === req.params.id);
  if (!review) { res.status(404).json({ success: false, error: 'Review not found' }); return; }
  res.json({ success: true, message: 'Review deleted' });
}
