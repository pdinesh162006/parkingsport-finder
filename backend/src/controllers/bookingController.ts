import { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse, AuthRequest } from '../types';

// ── Validation ──
export const createBookingSchema = z.object({
  spotId: z.string().min(1, 'spotId is required'),
  startTime: z.string().datetime('Invalid start time'),
  endTime: z.string().datetime('Invalid end time'),
});

// ── Mock Data ──
const mockBookings = [
  { id: '1', userId: '1', spotId: '1', spotName: 'Downtown Central Parking', startTime: '2024-04-01T09:00:00Z', endTime: '2024-04-01T13:00:00Z', totalPrice: 20.0, status: 'COMPLETED', createdAt: '2024-03-30' },
  { id: '2', userId: '1', spotId: '5', spotName: 'Harbor View Parking', startTime: '2024-04-10T10:00:00Z', endTime: '2024-04-10T14:00:00Z', totalPrice: 24.0, status: 'CONFIRMED', createdAt: '2024-04-08' },
  { id: '3', userId: '1', spotId: '2', spotName: 'Airport Long-Term Lot', startTime: '2024-04-15T06:00:00Z', endTime: '2024-04-18T18:00:00Z', totalPrice: 294.0, status: 'PENDING', createdAt: '2024-04-12' },
];

// ── Controllers ──

export function createBooking(req: AuthRequest, res: Response<ApiResponse>) {
  const { spotId, startTime, endTime } = req.body;
  // MOCK: Calculate price from duration (will use real pricePerHour from DB in Phase 10)
  const hours = (new Date(endTime).getTime() - new Date(startTime).getTime()) / (1000 * 60 * 60);
  const totalPrice = hours * 5; // mock $5/hr

  res.status(201).json({
    success: true,
    data: { id: '100', userId: req.user?.userId, spotId, startTime, endTime, totalPrice, status: 'PENDING', createdAt: new Date().toISOString() },
    message: 'Booking created',
  });
}

export function getUserBookings(req: AuthRequest, res: Response<ApiResponse>) {
  res.json({ success: true, data: mockBookings });
}

export function getBookingById(req: AuthRequest, res: Response<ApiResponse>) {
  const booking = mockBookings.find(b => b.id === req.params.id);
  if (!booking) { res.status(404).json({ success: false, error: 'Booking not found' }); return; }
  res.json({ success: true, data: booking });
}

export function cancelBooking(req: AuthRequest, res: Response<ApiResponse>) {
  const booking = mockBookings.find(b => b.id === req.params.id);
  if (!booking) { res.status(404).json({ success: false, error: 'Booking not found' }); return; }
  if (booking.status === 'CANCELLED' || booking.status === 'COMPLETED') {
    res.status(400).json({ success: false, error: `Cannot cancel a ${booking.status} booking` });
    return;
  }
  res.json({ success: true, data: { ...booking, status: 'CANCELLED' }, message: 'Booking cancelled' });
}
