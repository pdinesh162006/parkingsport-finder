import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';
import { ApiResponse } from '../types';

/**
 * Factory that creates a validation middleware from a Zod schema.
 *
 * WHY Zod over express-validator?
 * - Zod schemas are plain TypeScript — they compose, infer types, and test easily.
 * - express-validator is chain-based and harder to reuse outside Express.
 * - Zod integrates perfectly with Prisma's generated types later.
 *
 * Usage:
 *   import { z } from 'zod';
 *   const loginSchema = z.object({ email: z.string().email(), password: z.string().min(6) });
 *   router.post('/login', validate(loginSchema), controller);
 */
export function validate(schema: ZodSchema) {
  return (req: Request, res: Response<ApiResponse>, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const messages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`);
        res.status(400).json({
          success: false,
          error: 'Validation failed',
          message: messages.join(', '),
        });
        return;
      }
      next(err);
    }
  };
}
