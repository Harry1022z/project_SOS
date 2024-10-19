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

const verifyToken = (req: RequestWithUser, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'default_secret', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }


    req.user = user as DecodedToken;
    next();
  });
};

export default verifyToken;
