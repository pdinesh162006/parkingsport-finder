import { Router } from 'express';
import { getFavorites, addFavorite, removeFavorite, addFavoriteSchema } from '../controllers/favoriteController';
import { authenticate } from '../middlewares/auth';
import { validate } from '../middlewares/validate';

const router = Router();

// All favorites routes require authentication
router.get('/',       authenticate, getFavorites);
router.post('/',      authenticate, validate(addFavoriteSchema), addFavorite);
router.delete('/:id', authenticate, removeFavorite);

export default router;
