import { Router } from 'express';
import { getReviewsBySpot, createReview, updateReview, deleteReview, createReviewSchema, updateReviewSchema } from '../controllers/reviewController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

// Public: Get reviews for a parking spot
// Note: This is mounted as /api/parking/:id/reviews, so :id is the spot ID
router.get('/:id/reviews',  getReviewsBySpot);
router.post('/:id/reviews', authenticate, validate(createReviewSchema), createReview);

// Standalone review routes (for edit/delete by review ID)
router.put('/:id',    authenticate, validate(updateReviewSchema), updateReview);
router.delete('/:id', authenticate,                                deleteReview);

export default router;
