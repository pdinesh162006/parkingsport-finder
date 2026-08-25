import { Request, Response } from 'express';
import { z } from 'zod';
import { ApiResponse, AuthRequest } from '../types';

// ── Validation Schemas ──
export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// ── Controllers ──

export function register(req: Request, res: Response<ApiResponse>) {
  const { name, email } = req.body;

  // MOCK: In Phase 5 → hash password, save to DB, return JWT
  res.status(201).json({
    success: true,
    data: {
      user: { id: '100', name, email, role: 'USER', createdAt: new Date().toISOString() },
      token: 'mock-jwt-token',
    },
    message: 'Registration successful',
  });
}

export function login(req: Request, res: Response<ApiResponse>) {
  const { email } = req.body;

  // MOCK: In Phase 5 → verify password, return JWT
  res.status(200).json({
    success: true,
    data: {
      user: { id: '1', name: 'John Doe', email, role: 'USER', createdAt: '2024-01-15' },
      token: 'mock-jwt-token',
    },
    message: 'Login successful',
  });
}

export function logout(_req: Request, res: Response<ApiResponse>) {
  // MOCK: Stateless JWT — client discards token. Nothing to do server-side.
  res.status(200).json({
    success: true,
    message: 'Logged out successfully',
  });
}

export function getMe(req: AuthRequest, res: Response<ApiResponse>) {
  // Returns the currently authenticated user
  res.status(200).json({
    success: true,
    data: {
      id: req.user?.userId,
      name: 'John Doe',
      email: req.user?.email,
      role: req.user?.role,
      createdAt: '2024-01-15',
    },
  });
}
