import { Router } from 'express';
import { addToCart, removeFromCart, viewCart } from '../controllers/cartController';
import CartValidator from '../middleware/CartValidator';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/',verifyToken, CartValidator, addToCart);
router.delete('/:productId', CartValidator, removeFromCart);
router.get('/', viewCart);

export default router;
