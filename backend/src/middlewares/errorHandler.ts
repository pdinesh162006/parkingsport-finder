import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

/**
 * Centralized error handler — catches all errors thrown or passed via next(err).
 *
 * WHY a centralized handler?
 * - Prevents stack traces from leaking in production
 * - Ensures every error response has the same shape ({ success, error })
 * - One place to add logging/monitoring later
 */
export function errorHandler(err: Error, _req: Request, res: Response<ApiResponse>, _next: NextFunction) {
  console.error(`[ERROR] ${err.message}`);

  const statusCode = (err as any).statusCode || 500;
  const message = statusCode === 500 ? 'Internal server error' : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}

/**
 * 404 handler for undefined routes.
 */
export function notFoundHandler(_req: Request, res: Response<ApiResponse>, _next: NextFunction) {
  res.status(404).json({
    success: false,
    error: 'Route not found',
  });
}
