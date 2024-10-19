import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const CartValidator = [
  check('productId')
    .isString()
    .withMessage('El ID del producto debe ser una cadena de texto válida.'),
  check('quantity')
    .optional()
    .isInt({ min: 1 })
    .withMessage('La cantidad debe ser un número entero mayor o igual a 1.'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default CartValidator;
