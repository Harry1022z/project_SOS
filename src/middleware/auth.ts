import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface DecodedToken extends JwtPayload {
  id: string;
  email?: string;
  role?: string; 
}

interface RequestWithUser extends Request {
  user?: DecodedToken;
}


export const authenticateJWT = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token inválido' });
  }
};


export const authorizeRole = (role: string) => (req: RequestWithUser, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === role) {
    return next();
  }
  return res.status(403).json({ message: 'No tienes permisos para acceder a este recurso' });
};
