import { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse, AuthRequest } from '../types';

// ── Validation Schemas ──
export const createParkingSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  address: z.string().min(5, 'Address is required'),
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
  pricePerHour: z.number().positive('Price must be positive'),
  totalSlots: z.number().int().positive('Total slots must be positive'),
});

export const updateParkingSchema = createParkingSchema.partial();

// ── Mock Data ──
const mockSpots = [
  { id: '1', name: 'Downtown Central Parking', description: 'Premium covered parking in the heart of downtown.', address: '123 Main Street, Downtown', lat: 40.7128, lng: -74.006, pricePerHour: 5.0, totalSlots: 100, availableSlots: 34, rating: 4.5, reviewCount: 128, images: [], ownerId: '2', ownerName: 'Jane Smith', createdAt: '2024-01-20' },
  { id: '2', name: 'Airport Long-Term Lot', description: 'Affordable long-term parking near the airport.', address: '456 Airport Blvd', lat: 40.6413, lng: -73.7781, pricePerHour: 3.5, totalSlots: 250, availableSlots: 102, rating: 4.2, reviewCount: 89, images: [], ownerId: '2', ownerName: 'Jane Smith', createdAt: '2024-02-01' },
  { id: '3', name: 'Mall Underground Garage', description: 'Spacious underground parking.', address: '789 Shopping Ave', lat: 40.7589, lng: -73.9851, pricePerHour: 4.0, totalSlots: 180, availableSlots: 0, rating: 3.8, reviewCount: 56, images: [], ownerId: '5', ownerName: 'Alice Johnson', createdAt: '2024-02-15' },
];

// ── Controllers ──

export function getAllParking(req: Request, res: Response<ApiResponse>) {
  // Supports query params: ?page, &limit, &minPrice, &maxPrice, &minRating, &available
  const { page = '1', limit = '10' } = req.query;
  res.json({ success: true, data: { spots: mockSpots, total: mockSpots.length, page: Number(page), limit: Number(limit) } });
}

export function getParkingById(req: Request, res: Response<ApiResponse>) {
  const spot = mockSpots.find(s => s.id === req.params.id);
  if (!spot) { res.status(404).json({ success: false, error: 'Parking spot not found' }); return; }
  res.json({ success: true, data: spot });
}

export function getNearbyParking(req: Request, res: Response<ApiResponse>) {
  // Expects ?lat=&lng=&radius= (km)
  const { lat, lng, radius } = req.query;
  if (!lat || !lng) { res.status(400).json({ success: false, error: 'lat and lng are required' }); return; }
  // MOCK: return all spots with a fake distance field
  const withDistance = mockSpots.map((s, i) => ({ ...s, distance: (i + 1) * 0.5 }));
  res.json({ success: true, data: { spots: withDistance, radius: Number(radius) || 5 } });
}

export function createParking(req: AuthRequest, res: Response<ApiResponse>) {
  const newSpot = { id: '100', ...req.body, availableSlots: req.body.totalSlots, rating: 0, reviewCount: 0, images: [], ownerId: req.user?.userId, createdAt: new Date().toISOString() };
  res.status(201).json({ success: true, data: newSpot, message: 'Parking spot created' });
}

export function updateParking(req: AuthRequest, res: Response<ApiResponse>) {
  const spot = mockSpots.find(s => s.id === req.params.id);
  if (!spot) { res.status(404).json({ success: false, error: 'Parking spot not found' }); return; }
  res.json({ success: true, data: { ...spot, ...req.body }, message: 'Parking spot updated' });
}

export function deleteParking(req: AuthRequest, res: Response<ApiResponse>) {
  const spot = mockSpots.find(s => s.id === req.params.id);
  if (!spot) { res.status(404).json({ success: false, error: 'Parking spot not found' }); return; }
  res.json({ success: true, message: 'Parking spot deleted' });
}
