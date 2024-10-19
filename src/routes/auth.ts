import { Router } from 'express';
import { login } from '../controllers/authController';
import AuthValidator from '../middleware/AuthValidator';

const router = Router();

router.post('/', AuthValidator, login);

export default router;
