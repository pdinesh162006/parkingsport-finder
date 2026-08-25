import { Request, Response, NextFunction } from 'express';

/**
 * Simple request logger — logs method, URL, status, and duration.
 * Will be replaced with a proper logger (winston/pino) in production.
 */
export function requestLogger(req: Request, res: Response, next: NextFunction) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const color = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
    console.log(`${color}${req.method}\x1b[0m ${req.originalUrl} → ${res.statusCode} (${duration}ms)`);
  });

  next();
}
