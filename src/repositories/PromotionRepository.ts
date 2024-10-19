import { Pool } from 'mysql2/promise';
import PromotionDto from '../Dto/PromotionDto';

class PromotionRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  // Crear una nueva promoción
  async createPromotion(promotionData: PromotionDto): Promise<any> {
    try {
      const [result] = await this.db.query(
        'INSERT INTO promotions (name, discount, start_date, end_date) VALUES (?, ?, ?, ?)', 
        [promotionData.name, promotionData.discount, promotionData.startDate, promotionData.endDate]
      );
      return result;
    } catch (error) {
      console.error('Error creating promotion:', error);
      throw new Error('Unable to create promotion');
    }
  }

  // Obtener todas las promociones
  async getAllPromotions(): Promise<PromotionDto[]> {
    try {
      const [rows] = await this.db.query('SELECT * FROM promotions');
      // Aquí aseguramos que estamos usando `rows` y no el resultado completo
      return (rows as any[]).map((row) => new PromotionDto(row.name, row.discount, row.start_date, row.end_date, row.id));
    } catch (error) {
      console.error('Error fetching promotions:', error);
      throw new Error('Unable to fetch promotions');
    }
  }

  // Actualizar una promoción
  async updatePromotion(id: string, promotionData: PromotionDto): Promise<any> {
    try {
      const [result] = await this.db.query(
        'UPDATE promotions SET name = ?, discount = ?, start_date = ?, end_date = ? WHERE id = ?', 
        [promotionData.name, promotionData.discount, promotionData.startDate, promotionData.endDate, id]
      );
      return result;
    } catch (error) {
      console.error('Error updating promotion:', error);
      throw new Error('Unable to update promotion');
    }
  }

  // Eliminar una promoción
  async deletePromotion(id: string): Promise<any> {
    try {
      const [result] = await this.db.query('DELETE FROM promotions WHERE id = ?', [id]);
      return result;
    } catch (error) {
      console.error('Error deleting promotion:', error);
      throw new Error('Unable to delete promotion');
    }
  }
}

export default PromotionRepository;