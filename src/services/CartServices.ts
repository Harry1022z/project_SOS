import CartRepository from '../repositories/CartRepository';
import { Pool } from 'mysql2/promise';
import CartDto from '../Dto/CartDto';  // Importar correctamente

class CartServices {
  private cartRepository: CartRepository;

  constructor(db: Pool) {
    this.cartRepository = new CartRepository(db);
  }

  // Agregar un producto al carrito
  async addToCart(cartData: CartDto): Promise<any> {
    return await this.cartRepository.addToCart(cartData);
  }

  // Eliminar un producto del carrito
  async removeFromCart(userId: string, productId: string): Promise<any> {
    return await this.cartRepository.removeFromCart(userId, productId);
  }

  // Obtener todos los productos del carrito de un usuario
  async getCart(userId: string): Promise<CartDto[]> {
    const cartItems = await this.cartRepository.getCart(userId);
    return cartItems.map(item => new CartDto(item.userId, item.productId, item.quantity));
  }

  // Actualizar la cantidad de un producto en el carrito
  async updateQuantity(userId: string, productId: string, quantity: number): Promise<any> {
    return await this.cartRepository.updateQuantity(userId, productId, quantity);
  }
}

export default CartServices;
