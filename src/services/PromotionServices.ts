import PromotionRepository from '../repositories/PromotionRepository';
import { Pool } from 'mysql2/promise';
import PromotionDto from '../Dto/PromotionDto';

class PromotionServices {
  private promotionRepository: PromotionRepository;

  constructor(db: Pool) {
    this.promotionRepository = new PromotionRepository(db);
  }

  // Crear una nueva promoción
  async createPromotion(promotionData: PromotionDto): Promise<any> {
    return await this.promotionRepository.createPromotion(promotionData);
  }

  // Obtener todas las promociones
  async getPromotions(): Promise<PromotionDto[]> {
    return await this.promotionRepository.getAllPromotions();
  }

  // Actualizar una promoción
  async updatePromotion(id: string, promotionData: PromotionDto): Promise<any> {
    return await this.promotionRepository.updatePromotion(id, promotionData);
  }

  // Eliminar una promoción
  async deletePromotion(id: string): Promise<any> {
    return await this.promotionRepository.deletePromotion(id);
  }
}

export default PromotionServices;
