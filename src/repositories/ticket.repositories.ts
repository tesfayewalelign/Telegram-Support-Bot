import { eq, and } from "drizzle-orm";

import { db } from "../db";
import { tickets } from "../db/schema";

export class TicketRepository {
  /**
   * Create a new support ticket.
   */
  async create(data: typeof tickets.$inferInsert) {
    const [ticket] = await db.insert(tickets).values(data).returning();

    return ticket;
  }

  /**
   * Find ticket by ID.
   */
  async findById(id: string) {
    return await db.query.tickets.findFirst({
      where: eq(tickets.id, id),
    });
  }

  /**
   * Find all tickets for a user.
   */
  async findByUser(userId: string) {
    return await db.query.tickets.findMany({
      where: eq(tickets.userId, userId),
    });
  }

  /**
   * Find an open ticket for a user.
   */
  async findOpenByUser(userId: string) {
    return await db.query.tickets.findFirst({
      where: and(eq(tickets.userId, userId), eq(tickets.status, "open")),
    });
  }

  /**
   * Update ticket status.
   */
  async updateStatus(id: string, status: "open" | "in_progress" | "closed") {
    const [ticket] = await db
      .update(tickets)
      .set({
        status,
      })
      .where(eq(tickets.id, id))
      .returning();

    return ticket;
  }
  /**
   * Find all open tickets for admin.
   */
  async findOpenTickets() {
    return await db.query.tickets.findMany({
      where: eq(tickets.status, "open"),
      with: {
        user: true,
      },
      orderBy: (tickets, { desc }) => desc(tickets.createdAt),
    });
  }
  /**
   * Close ticket.
   */
  async close(id: string) {
    const [ticket] = await db
      .update(tickets)
      .set({
        status: "closed",
        closedAt: new Date(),
      })
      .where(eq(tickets.id, id))
      .returning();

    return ticket;
  }

  /**
   * Get all tickets.
   */
  async findAll() {
    return await db.query.tickets.findMany();
  }
}

export const ticketRepository = new TicketRepository();
