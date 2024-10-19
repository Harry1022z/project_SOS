import { check, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

const AuthValidator = [
  check('email').isEmail().withMessage('Debes proporcionar un correo electrónico válido.'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres.'),
  

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

export default AuthValidator;
