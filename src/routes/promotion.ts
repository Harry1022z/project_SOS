import { Router } from 'express';
import { createPromotion, getPromotions, updatePromotion, deletePromotion } from '../controllers/promotionController';
import PromotionValidator from '../middleware/PromotionValidator';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/promotions', verifyToken, PromotionValidator, createPromotion);
router.get('/promotions', getPromotions);         
router.put('/promotions/:id', updatePromotion);   
router.delete('/promotions/:id', deletePromotion);

export default router;
