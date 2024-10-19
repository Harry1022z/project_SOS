import { Pool } from 'mysql2/promise';
import UserDto from '../Dto/UserDto';

class UserRepository {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  // Buscar un usuario por su correo electrónico
  async findByEmail(email: string): Promise<UserDto | null> {
    try {
      const [results] = await this.db.execute('SELECT * FROM users WHERE email = ?', [email]);
      const rows = results as UserDto[];

      if (rows.length > 0) {
        return new UserDto(rows[0].id, rows[0].email, rows[0].password);
      }
      return null; 
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw new Error('Unable to find user');
    }
  }

  // Registrar un nuevo usuario
  async register(userData: UserDto): Promise<any> {
    try {
      const [result] = await this.db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [userData.email, userData.password]);
      return result;
    } catch (error) {
      console.error('Error registering user:', error);
      throw new Error('Unable to register user');
    }
  }

  // Obtener el perfil de un usuario
  async getProfile(userId: string): Promise<UserDto | null> {
    try {
      const [results] = await this.db.execute('SELECT * FROM users WHERE id = ?', [userId]);
      const rows = results as UserDto[];

      if (rows.length > 0) {
        return new UserDto(rows[0].id, rows[0].email, rows[0].password);
      }
      return null;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw new Error('Unable to fetch user profile');
    }
  }

  // Actualizar la información de un usuario
  async updateUser(userId: string, userData: UserDto): Promise<any> {
    try {
      const [result] = await this.db.execute('UPDATE users SET email = ?, password = ? WHERE id = ?', 
        [userData.email, userData.password, userId]);
      return result;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Unable to update user');
    }
  }

  // Eliminar un usuario
  async deleteUser(userId: string): Promise<any> {
    try {
      const [result] = await this.db.execute('DELETE FROM users WHERE id = ?', [userId]);
      return result;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Unable to delete user');
    }
  }
}

export default UserRepository;
