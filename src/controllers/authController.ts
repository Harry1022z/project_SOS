// authController.ts
import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import AuthDto from '../Dto/AuthDto';
import db from '../config/database'; 

const userServices = new UserServices(db);

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email y contraseña son requeridos' });
    }

    const authData = new AuthDto(email, password); 
    const token = await userServices.login(authData.email, authData.password);

    if (!token) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
};

export { login };
