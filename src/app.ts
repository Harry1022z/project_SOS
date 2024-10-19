import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import registerRoutes from './routes/register';
import verifyToken from './middleware/VerifyToken';
import cartRoutes from './routes/cart';
import promotionRoutes from './routes/promotion';

dotenv.config();

const app = express();


app.use(express.json());

// Rutas públicas
app.use('/auth', authRoutes);
app.use('/register', registerRoutes);


app.use('/products', verifyToken, productRoutes);
app.use('/cart', verifyToken, cartRoutes);
app.use('/promotions', verifyToken, promotionRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
