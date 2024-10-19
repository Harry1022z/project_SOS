import { Request, Response } from 'express';
import UserServices from '../services/UserServices';
import db from '../config/database';

const userServices = new UserServices(db);

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'No estás autorizado' });
    }

    const userProfile = await userServices.getProfile(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'Perfil no encontrado' });
    }

    return res.status(200).json(userProfile);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener el perfil' });
  }
};
