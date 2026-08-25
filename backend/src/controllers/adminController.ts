import { Request, Response } from 'express';
import { ApiResponse, AuthRequest } from '../types';

// ── Mock Data ──
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'USER', createdAt: '2024-01-15' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'OWNER', createdAt: '2024-02-10' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'ADMIN', createdAt: '2024-01-01' },
];

const mockStats = {
  totalUsers: 1245,
  totalSpots: 328,
  totalBookings: 5672,
  totalRevenue: 45230,
  activeBookings: 187,
  pendingOwners: 12,
};

// ── Controllers ──

export function getUsers(_req: AuthRequest, res: Response<ApiResponse>) {
  res.json({ success: true, data: mockUsers });
}

export function getAllParking(_req: AuthRequest, res: Response<ApiResponse>) {
  // Admin sees all parking spots — distinct from public list because it may include unapproved ones
  res.json({
    success: true,
    data: [
      { id: '1', name: 'Downtown Central Parking', ownerName: 'Jane Smith', pricePerHour: 5.0, totalSlots: 100, availableSlots: 34, rating: 4.5, status: 'approved' },
      { id: '2', name: 'Airport Long-Term Lot', ownerName: 'Jane Smith', pricePerHour: 3.5, totalSlots: 250, availableSlots: 102, rating: 4.2, status: 'approved' },
      { id: '3', name: 'Mall Underground Garage', ownerName: 'Alice Johnson', pricePerHour: 4.0, totalSlots: 180, availableSlots: 0, rating: 3.8, status: 'pending' },
    ],
  });
}

export function getAllBookings(_req: AuthRequest, res: Response<ApiResponse>) {
  res.json({
    success: true,
    data: [
      { id: '1', spotName: 'Downtown Central Parking', userName: 'John Doe', startTime: '2024-04-01T09:00:00Z', endTime: '2024-04-01T13:00:00Z', totalPrice: 20.0, status: 'COMPLETED' },
      { id: '2', spotName: 'Harbor View Parking', userName: 'John Doe', startTime: '2024-04-10T10:00:00Z', endTime: '2024-04-10T14:00:00Z', totalPrice: 24.0, status: 'CONFIRMED' },
    ],
  });
}

export function getStatistics(_req: AuthRequest, res: Response<ApiResponse>) {
  res.json({ success: true, data: mockStats });
}
