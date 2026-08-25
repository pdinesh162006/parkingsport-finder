import { Router } from 'express';
import { getAllParking, getParkingById, getNearbyParking, createParking, updateParking, deleteParking, createParkingSchema, updateParkingSchema } from '../controllers/parkingController';
import { authenticate, requireRole } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

// Public routes
router.get('/',         getAllParking);
router.get('/nearby',   getNearbyParking);
router.get('/:id',      getParkingById);

// Protected routes — owner/admin only
router.post('/',        authenticate, requireRole('OWNER', 'ADMIN'), validate(createParkingSchema), createParking);
router.put('/:id',      authenticate, requireRole('OWNER', 'ADMIN'), validate(updateParkingSchema), updateParking);
router.delete('/:id',   authenticate, requireRole('OWNER', 'ADMIN'),                                deleteParking);

export default router;
