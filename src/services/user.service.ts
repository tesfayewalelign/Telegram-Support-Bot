import { userRepository } from "../repositories/user.repositories";

export class UserService {
  /**
   * Register a Telegram user.
   */
  async registerUser(data: {
    telegramId: number;
    username?: string;
    firstName: string;
    lastName?: string;
    languageCode?: string;
  }) {
    const existingUser = await userRepository.findByTelegramId(data.telegramId);

    if (existingUser) {
      return existingUser;
    }

    return await userRepository.create({
      telegramId: data.telegramId,
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      languageCode: data.languageCode,
      isAdmin: false,
    });
  }

  /**
   * Find user by Telegram ID.
   */
  async getByTelegramId(telegramId: number) {
    return await userRepository.findByTelegramId(telegramId);
  }

  /**
   * Find user by ID.
   */
  async getById(id: string) {
    return await userRepository.findById(id);
  }

  /**
   * Update user.
   */
  async updateUser(id: string, data: any) {
    return await userRepository.update(id, data);
  }

  /**
   * Delete user.
   */
  async deleteUser(id: string) {
    return await userRepository.delete(id);
  }

  /**
   * Get all admins.
   */
  async getAdmins() {
    return await userRepository.findAdmins();
  }

  /**
   * Get all users.
   */
  async getAllUsers() {
    return await userRepository.findAll();
  }
}

export const userService = new UserService();
