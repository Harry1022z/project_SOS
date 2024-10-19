import { Request, Response } from 'express';
import Promotion from '../Dto/Promotion';

let promotions: Promotion[] = [];

export const createPromotion = (req: Request, res: Response) => {
  const { description, discountPercentage, productId } = req.body;

  const newPromotion = new Promotion((promotions.length + 1).toString(), description, discountPercentage, productId);
  promotions.push(newPromotion);

  return res.status(201).json({ message: 'Promoción creada', promotion: newPromotion });
};

export const viewPromotions = (req: Request, res: Response) => {
  return res.status(200).json(promotions);
};
