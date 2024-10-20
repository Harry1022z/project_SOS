import { Request, Response } from 'express';
import PromotionServices from '../services/PromotionServices';
import PromotionDto from '../Dto/PromotionDto';
import pool from '../config/database';

const promotionServices = new PromotionServices(pool);

// Crear una nueva promoción
export const createPromotion = async (req: Request, res: Response) => {
  try {
    const { name, discount, startDate, endDate } = req.body;

    // Crear una nueva instancia de PromotionDto
    const newPromotion = new PromotionDto(name, discount, startDate, endDate);

    // Llamamos al servicio para crear la promoción
    const result = await promotionServices.createPromotion(newPromotion);

    return res.status(201).json({ message: 'Promoción creada', result });
  } catch (error) {
    console.error('Error creando la promoción:', error);
    return res.status(500).json({ message: 'Error creando la promoción' });
  }
};

// Obtener todas las promociones
export const getPromotions = async (req: Request, res: Response) => {
  try {
    const promotions = await promotionServices.getPromotions();
    return res.status(200).json(promotions);
  } catch (error) {
    console.error('Error obteniendo promociones:', error);
    return res.status(500).json({ message: 'Error obteniendo las promociones' });
  }
};

// Actualizar una promoción
export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, discount, startDate, endDate } = req.body;

    // Creamos una instancia de PromotionDto con los datos recibidos
    const updatedPromotion = new PromotionDto(name, discount, startDate, endDate);

    // Llamamos al servicio para actualizar la promoción
    const result = await promotionServices.updatePromotion(id, updatedPromotion);

    return res.status(200).json({ message: 'Promoción actualizada', result });
  } catch (error) {
    console.error('Error actualizando la promoción:', error);
    return res.status(500).json({ message: 'Error actualizando la promoción' });
  }
};

// Eliminar una promoción
export const deletePromotion = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Llamamos al servicio para eliminar la promoción
    const result = await promotionServices.deletePromotion(id);

    return res.status(200).json({ message: 'Promoción eliminada', result });
  } catch (error) {
    console.error('Error eliminando la promoción:', error);
    return res.status(500).json({ message: 'Error eliminando la promoción' });
  }
};
