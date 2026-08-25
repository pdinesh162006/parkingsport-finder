// ── Role & Auth ──
export type UserRole = 'USER' | 'OWNER' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

// ── Parking ──
export interface ParkingSpot {
  id: string;
  name: string;
  description: string;
  address: string;
  lat: number;
  lng: number;
  pricePerHour: number;
  totalSlots: number;
  availableSlots: number;
  rating: number;
  reviewCount: number;
  images: string[];
  ownerId: string;
  ownerName?: string;
  createdAt: string;
}

// ── Review ──
export interface Review {
  id: string;
  userId: string;
  userName: string;
  spotId: string;
  rating: number;
  comment: string;
  createdAt: string;
}

// ── Booking ──
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Booking {
  id: string;
  userId: string;
  spotId: string;
  spotName: string;
  spotAddress: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: BookingStatus;
  createdAt: string;
}

// ── Favorite ──
export interface Favorite {
  id: string;
  userId: string;
  spotId: string;
  spot: ParkingSpot;
  createdAt: string;
}

// ── Stats ──
export interface AdminStats {
  totalUsers: number;
  totalSpots: number;
  totalBookings: number;
  totalRevenue: number;
  activeBookings: number;
  pendingOwners: number;
}

export interface OwnerStats {
  totalSpots: number;
  totalBookings: number;
  estimatedRevenue: number;
  averageRating: number;
  occupancyRate: number;
}
