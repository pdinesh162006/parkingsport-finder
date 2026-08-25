import { Request } from 'express';

// Roles
export type UserRole = 'USER' | 'OWNER' | 'ADMIN';

// Booking statuses
export type BookingStatus = 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

// JWT payload shape attached to authenticated requests
export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
}

// Extend Express Request to include our auth data
export interface AuthRequest extends Request {
  user?: JwtPayload;
}

// Standard API response shape — every route returns this
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
