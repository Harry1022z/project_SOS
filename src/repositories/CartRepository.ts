import { Pool } from 'mysql2/promise';

interface CartDto {
  userId: string;
  productId: string;
  quantity: number;
}

class CartRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  // Agregar un producto al carrito
  async addToCart(cartData: CartDto): Promise<any> {
    try {
      const [result] = await this.db.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)', 
        [cartData.userId, cartData.productId, cartData.quantity]);
      return result;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw new Error('Unable to add to cart');
    }
  }

  // Eliminar un producto del carrito
  async removeFromCart(userId: string, productId: string): Promise<any> {
    try {
      const [result] = await this.db.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
      return result;
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw new Error('Unable to remove from cart');
    }
  }

  // Obtener todos los productos del carrito de un usuario
  async getCart(userId: string): Promise<CartDto[]> {
    try {
      const [rows] = await this.db.query('SELECT * FROM cart WHERE user_id = ?', [userId]);
      return rows as CartDto[];
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw new Error('Unable to fetch cart');
    }
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateQuantity(userId: string, productId: string, quantity: number): Promise<any> {
    try {
      const [result] = await this.db.query('UPDATE cart SET quantity = ? WHERE user_id = ? AND product_id = ?', 
        [quantity, userId, productId]);
      return result;
    } catch (error) {
      console.error('Error updating quantity:', error);
      throw new Error('Unable to update quantity');
    }
  }
}

export default CartRepository;
