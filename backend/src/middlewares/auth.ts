import { Response, NextFunction } from 'express';
import { AuthRequest, JwtPayload, UserRole, ApiResponse } from '../types';

/**
 * Auth middleware — verifies JWT and attaches user to request.
 * Currently STUBBED: accepts any request and attaches a mock user.
 * Will be wired to real JWT verification in Phase 5.
 */
export function authenticate(req: AuthRequest, _res: Response, next: NextFunction) {
  // STUB: In Phase 5 this will verify the Authorization header's Bearer token
  // For now, attach a mock user so controllers can reference req.user
  req.user = {
    userId: '1',
    email: 'john@example.com',
    role: 'USER',
  };
  next();
}

/**
 * Role-based authorization — must be used AFTER authenticate.
 * Checks if the authenticated user has one of the allowed roles.
 *
 * Usage: router.get('/admin/users', authenticate, requireRole('ADMIN'), controller)
 */
export function requireRole(...roles: UserRole[]) {
  return (req: AuthRequest, res: Response<ApiResponse>, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ success: false, error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ success: false, error: 'Insufficient permissions' });
      return;
    }

    next();
  };
}
