import { eq } from "drizzle-orm";

import { db } from "../db";
import { messages } from "../db/schema";

export class MessageRepository {
  /**
   * Save a message.
   */
  async create(data: typeof messages.$inferInsert) {
    const [message] = await db.insert(messages).values(data).returning();

    return message;
  }

  /**
   * Get all messages for a ticket.
   */
  async findByTicket(ticketId: string) {
    return await db.query.messages.findMany({
      where: eq(messages.ticketId, ticketId),

      orderBy: (messages, { asc }) => asc(messages.createdAt),
    });
  }

  /**
   * Delete a message.
   */
  async delete(id: string) {
    const [message] = await db
      .delete(messages)
      .where(eq(messages.id, id))
      .returning();

    return message;
  }

  /**
   * Get message by ID.
   */
  async findById(id: string) {
    return await db.query.messages.findFirst({
      where: eq(messages.id, id),
    });
  }
}

export const messageRepository = new MessageRepository();
