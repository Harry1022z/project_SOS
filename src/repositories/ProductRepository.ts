import { Pool } from 'mysql2/promise';
import ProductDto from '../Dto/ProductDto';

class ProductRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  // Agregar un nuevo producto
  async addProduct(productData: ProductDto): Promise<any> {
    try {
      const [result] = await this.db.query('INSERT INTO products (name, description, category, price) VALUES (?, ?, ?, ?)', 
        [productData.name, productData.description, productData.category, productData.price]);
      return result;
    } catch (error) {
      console.error('Error adding product:', error);
      throw new Error('Unable to add product');
    }
  }

  // Obtener todos los productos
  async getAllProducts(): Promise<ProductDto[]> {
    try {
      const [rows] = await this.db.query('SELECT * FROM products');
      return rows as ProductDto[];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new Error('Unable to fetch products');
    }
  }

  // Obtener un producto por ID
  async getProductById(productId: string): Promise<ProductDto | null> {
    try {
      const [results] = await this.db.execute('SELECT * FROM products WHERE id = ?', [productId]);
      const rows = results as ProductDto[];

      if (rows.length > 0) {
        return rows[0];
      }
      return null; 
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new Error('Unable to fetch product');
    }
  }

  // Actualizar un producto
  async updateProduct(productId: string, productData: ProductDto): Promise<any> {
    try {
      const [result] = await this.db.query('UPDATE products SET name = ?, description = ?, category = ?, price = ? WHERE id = ?', 
        [productData.name, productData.description, productData.category, productData.price, productId]);
      return result;
    } catch (error) {
      console.error('Error updating product:', error);
      throw new Error('Unable to update product');
    }
  }

  // Eliminar un producto
  async deleteProduct(productId: string): Promise<any> {
    try {
      const [result] = await this.db.query('DELETE FROM products WHERE id = ?', [productId]);
      return result;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new Error('Unable to delete product');
    }
  }
}

export default ProductRepository;
