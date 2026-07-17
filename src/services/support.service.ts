import { messageRepository } from "../repositories/messeges.repositories";
import { ticketRepository } from "../repositories/ticket.repositories";
import { userRepository } from "../repositories/user.repositories";

export class SupportService {
  /**
   * Create a support ticket and save the first message.
   */
  async createTicket(telegramId: number, message: string) {
    // Find the user
    const user = await userRepository.findByTelegramId(telegramId);

    if (!user) {
      throw new Error("User not found.");
    }

    // Check for an existing open ticket
    const openTicket = await ticketRepository.findOpenByUser(user.id);

    if (openTicket) {
      // Save the new message to the existing ticket
      await messageRepository.create({
        ticketId: openTicket.id,
        senderId: user.id,
        content: message,
      });

      return {
        ticket: openTicket,
        isNew: false,
      };
    }

    // Create a new ticket
    const ticketNumber = Math.floor(10000 + Math.random() * 90000);
    const ticket = await ticketRepository.create({
      ticketNumber,
      userId: user.id,

      subject: "Telegram Support",
      status: "open",
    });

    // Satisfy TypeScript
    if (!ticket) {
      throw new Error("Failed to create ticket.");
    }

    // Save the first message
    await messageRepository.create({
      ticketId: ticket.id,
      senderId: user.id,
      content: message,
    });

    return {
      ticket,
      isNew: true,
    };
  }

  /**
   * Add a reply to an existing ticket.
   */
  async addMessage(ticketId: string, senderId: string, content: string) {
    return await messageRepository.create({
      ticketId,
      senderId,
      content,
    });
  }

  /**
   * Close a support ticket.
   */
  async closeTicket(ticketId: string) {
    return await ticketRepository.close(ticketId);
  }

  /**
   * Get ticket conversation.
   */
  async getConversation(ticketId: string) {
    return await messageRepository.findByTicket(ticketId);
  }
}

export const supportService = new SupportService();
