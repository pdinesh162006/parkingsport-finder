import { Router } from 'express';
import { getUsers, getAllParking, getAllBookings, getStatistics } from '../controllers/adminController';
import { authenticate, requireRole } from '../middlewares/auth';

const router = Router();

// All admin routes require ADMIN role
router.use(authenticate, requireRole('ADMIN'));

router.get('/users',      getUsers);
router.get('/parking',    getAllParking);
router.get('/bookings',   getAllBookings);
router.get('/statistics', getStatistics);

export default router;
