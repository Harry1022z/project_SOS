import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const PromotionValidator = [
  check('name')
    .isString()
    .notEmpty()
    .withMessage('El nombre de la promoción no puede estar vacío.'),
  check('discount')
    .isFloat({ min: 0, max: 100 })
    .withMessage('El descuento debe ser un número entre 0 y 100.'),
  check('startDate')
    .isISO8601()
    .withMessage('La fecha de inicio debe ser una fecha válida en formato ISO8601.'),
  check('endDate')
    .isISO8601()
    .withMessage('La fecha de finalización debe ser una fecha válida en formato ISO8601.'),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default PromotionValidator;
