import { Request, Response } from 'express';
import ProductServices from '../services/ProductServices';
import { validationResult } from 'express-validator';
import ProductDto from '../Dto/ProductDto';
import db from '../config/database';

const productServices = new ProductServices(db);

export const addProduct = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price, discountPercentage, stock, category, imageUrl } = req.body;

    const newProduct = new ProductDto(name, description, price, discountPercentage, stock, category, imageUrl);

    const result = await productServices.addProduct(newProduct);
    return res.status(201).json({ message: 'Producto registrado correctamente', productId: result.insertId });
  } catch (error) {
    return res.status(500).json({ error: 'Error al registrar producto' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await productServices.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener productos' });
  }
};
