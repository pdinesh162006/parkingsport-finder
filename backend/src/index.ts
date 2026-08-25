import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config';
import { requestLogger } from './middlewares/requestLogger';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';

// Route imports
import authRoutes from './routes/authRoutes';
import parkingRoutes from './routes/parkingRoutes';
import favoriteRoutes from './routes/favoriteRoutes';
import reviewRoutes from './routes/reviewRoutes';
import bookingRoutes from './routes/bookingRoutes';
import adminRoutes from './routes/adminRoutes';

const app = express();

// ── Global Middleware ──
app.use(helmet());                                           // Security headers
app.use(cors({ origin: config.frontendUrl }));               // CORS — locked to frontend URL
app.use(express.json());                                     // Parse JSON bodies
app.use(requestLogger);                                      // Log all requests

// ── Health Check ──
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', message: 'Backend is running!' });
});

// ── API Routes ──
//
// REQUEST LIFECYCLE:
// 1. Request hits Express
// 2. Global middleware (helmet, cors, json, logger)
// 3. Route matched → route-level middleware (validate, authenticate, requireRole)
// 4. Controller function runs → returns JSON response
// 5. If anything throws → errorHandler catches it and returns a clean { success, error }
//
app.use('/api/auth',      authRoutes);
app.use('/api/parking',   parkingRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/reviews',   reviewRoutes);     // standalone review edit/delete
app.use('/api/parking',   reviewRoutes);     // /api/parking/:id/reviews
app.use('/api/bookings',  bookingRoutes);
app.use('/api/admin',     adminRoutes);

// ── Error Handling ──
app.use(notFoundHandler);                                    // 404 for undefined routes
app.use(errorHandler);                                       // Centralized error handler

// ── Start Server ──
app.listen(config.port, () => {
  console.log(`\n🚀 Server running on http://localhost:${config.port}`);
  console.log(`📋 Health check: http://localhost:${config.port}/api/health`);
  console.log(`🌐 CORS origin: ${config.frontendUrl}\n`);
});
