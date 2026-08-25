import { Router } from 'express';
import { createBooking, getUserBookings, getBookingById, cancelBooking, createBookingSchema } from '../controllers/bookingController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

// All booking routes require authentication
router.post('/',          authenticate, validate(createBookingSchema), createBooking);
router.get('/',           authenticate, getUserBookings);
router.get('/:id',        authenticate, getBookingById);
router.put('/:id/cancel', authenticate, cancelBooking);

export default router;
