import { ticketRepository } from "../repositories/ticket.repositories";
import { messageRepository } from "../repositories/messeges.repositories";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export class AdminService {
  /**
   * Get open tickets
   */
  async getOpenTickets() {
    return await ticketRepository.findOpenTickets();
  }

  /**
   * Get ticket conversation
   */
  async getConversation(ticketId: string) {
    return await messageRepository.findByTicket(ticketId);
  }

  /**
   * Send admin reply
   */
  async replyToTicket(ticketId: string, adminId: string, content: string) {
    const savedMessage = await messageRepository.create({
      ticketId,
      senderId: adminId,
      content,
    });

    const user = await this.getTicketUser(ticketId);

    if (!user) {
      throw new Error("Ticket owner not found");
    }

    return {
      message: savedMessage,
      user,
    };
  }

  /**
   * Get ticket owner
   */
  async getTicketUser(ticketId: string) {
    const ticket = await ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new Error("Ticket not found");
    }

    return await db.query.users.findFirst({
      where: eq(users.id, ticket.userId),
    });
  }

  /**
   * Close ticket
   */
  async closeTicket(ticketId: string) {
    return await ticketRepository.close(ticketId);
  }
}

export const adminService = new AdminService();
