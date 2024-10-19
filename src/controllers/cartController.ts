// controllers/cartController.ts
import { Request, Response } from 'express';
import Cart from '../Dto/Cart';
import Promotion from '../Dto/Promotion';

const cart = new Cart();
let promotions: Promotion[] = [];

const applyPromotions = (cart: Cart) => {
  let totalDiscount = 0;

  cart.items.forEach(item => {
    const promotion = promotions.find(p => p.productId === item.productId);
    if (promotion) {
      totalDiscount += (item.quantity * promotion.discountPercentage) / 100;
    }
  });

  return totalDiscount;
};

export const addToCart = (req: Request, res: Response) => {
  const { productId, quantity } = req.body;

  cart.addItem(productId, quantity);
  return res.status(200).json({ message: 'Producto añadido al carrito', cart });
};

export const removeFromCart = (req: Request, res: Response) => {
  const { productId } = req.params;

  cart.removeItem(productId);
  return res.status(200).json({ message: 'Producto eliminado del carrito', cart });
};

export const viewCart = (req: Request, res: Response) => {
  const totalDiscount = applyPromotions(cart);
  return res.status(200).json({ cart, totalDiscount });
};
