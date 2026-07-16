import { eq } from "drizzle-orm";

import { db } from "../db";
import { users } from "../db/schema";

export class UserRepository {
  /**
   * Find a user by Telegram ID.
   */
  async findByTelegramId(telegramId: number) {
    return await db.query.users.findFirst({
      where: eq(users.telegramId, telegramId),
    });
  }

  /**
   * Find a user by database ID.
   */
  async findById(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }

  /**
   * Create a new user.
   */
  async create(data: typeof users.$inferInsert) {
    const [user] = await db.insert(users).values(data).returning();

    return user;
  }

  /**
   * Update an existing user.
   */
  async update(id: string, data: Partial<typeof users.$inferInsert>) {
    const [user] = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  /**
   * Delete a user.
   */
  async delete(id: string) {
    const [user] = await db.delete(users).where(eq(users.id, id)).returning();

    return user;
  }

  /**
   * Find all admins.
   */
  async findAdmins() {
    return await db.query.users.findMany({
      where: eq(users.isAdmin, true),
    });
  }

  /**
   * Get all users.
   */
  async findAll() {
    return await db.query.users.findMany();
  }
}
export const userRepository = new UserRepository();
