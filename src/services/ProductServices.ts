import ProductRepository from '../repositories/ProductRepository';
import { Pool } from 'mysql2/promise';
import ProductDto from '../Dto/ProductDto';

class ProductServices {
  private productRepository: ProductRepository;

  constructor(db: Pool) {
    this.productRepository = new ProductRepository(db);
  }

  async addProduct(productData: ProductDto): Promise<any> {
    return await this.productRepository.addProduct(productData);
  }

  async getProducts(): Promise<any[]> {
    return await this.productRepository.getAllProducts();
  }
}


export default ProductServices;
