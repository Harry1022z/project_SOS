import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const ProductValidator = [
  check('name')
    .isString()
    .withMessage('El nombre del producto debe ser una cadena de texto.')
    .notEmpty()
    .withMessage('El nombre del producto no puede estar vacío.'),
  check('price')
    .isFloat({ min: 0 })
    .withMessage('El precio debe ser un número mayor o igual a 0.'),
  check('inventory')
    .optional()
    .isInt({ min: 0 })
    .withMessage('El inventario debe ser un número entero mayor o igual a 0.'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default ProductValidator;
