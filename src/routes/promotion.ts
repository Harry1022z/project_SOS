import { Router } from 'express';
import { createPromotion, viewPromotions } from '../controllers/promotionController';
import PromotionValidator from '../middleware/PromotionValidator';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/', verifyToken,  PromotionValidator, createPromotion);
router.get('/', viewPromotions);

export default router;
