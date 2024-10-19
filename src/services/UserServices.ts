import UserRepository from '../repositories/UserRepository';
import { Pool } from 'mysql2/promise';
import UserDto from '../Dto/UserDto';
import generateToken from '../Helpers/generateToken';

class UserServices {
  private userRepository: UserRepository;

  constructor(db: Pool) {
    this.userRepository = new UserRepository(db);
  }

  async register(userData: UserDto): Promise<any> {
    return await this.userRepository.register(userData);
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.userRepository.findByEmail(email);

    if (user && user.password === password) {
      return generateToken(user.id);
    }

    return null;
  }

  async getProfile(userId: string): Promise<any> {
    return await this.userRepository.getProfile(userId);
  }
}

export default UserServices;
