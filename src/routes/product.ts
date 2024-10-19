import { Router } from 'express';
import { addProduct, getProducts } from '../controllers/productController';
import ProductValidator from '../middleware/ProductValidator';
import verifyToken from '../middleware/VerifyToken';

const router = Router();

router.post('/', verifyToken, ProductValidator, addProduct);

router.get('/', getProducts);

export default router;
