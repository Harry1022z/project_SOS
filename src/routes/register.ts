import { Router } from 'express';
import register from '../controllers/registerController';
import RegisterValidator from '../middleware/RegisterValidator';

const router = Router();

router.post('/', RegisterValidator, register);

export default router;
