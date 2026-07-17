import { relations } from "drizzle-orm";
import { users, tickets, messages } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  tickets: many(tickets),
}));
export const ticketsRelations = relations(tickets, ({ one, many }) => ({
  user: one(users, {
    fields: [tickets.userId],
    references: [users.id],
  }),

  messages: many(messages),
}));
export const messagesRelations = relations(messages, ({ one }) => ({
  ticket: one(tickets, {
    fields: [messages.ticketId],
    references: [tickets.id],
  }),

  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));
console.log("RELATIONS CHECK");

console.log({
  usersId: users.id,
  ticketUserId: tickets.userId,
  ticketId: tickets.id,
  messageTicketId: messages.ticketId,
  messageSenderId: messages.senderId,
});
