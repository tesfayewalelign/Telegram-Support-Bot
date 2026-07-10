import {
  pgTable,
  uuid,
  bigint,
  text,
  integer,
  boolean,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
export const ticketStatusEnum = pgEnum("ticket_status", [
  "open",
  "in_progress",
  "closed",
]);
export const ticketPriorityEnum = pgEnum("ticket_priority", [
  "low",
  "normal",
  "high",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  telegramId: bigint("telegram_id", {
    mode: "number",
  })
    .unique()
    .notNull(),

  username: text("username"),

  firstName: text("first_name").notNull(),

  lastName: text("last_name"),

  languageCode: text("language_code"),

  isAdmin: boolean("is_admin").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
export const tickets = pgTable("tickets", {
  id: uuid("id").defaultRandom().primaryKey(),

  ticketNumber: integer("ticket_number").unique().notNull(),

  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),

  subject: text("subject").notNull(),

  status: ticketStatusEnum("status").default("open").notNull(),

  priority: ticketPriorityEnum("priority").default("normal").notNull(),

  assignedAdminId: uuid("assigned_admin_id").references(() => users.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),

  updatedAt: timestamp("updated_at").defaultNow().notNull(),

  closedAt: timestamp("closed_at"),
});
export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),

  ticketId: uuid("ticket_id")
    .notNull()
    .references(() => tickets.id),

  senderId: uuid("sender_id")
    .notNull()
    .references(() => users.id),

  content: text("content").notNull(),

  messageType: text("message_type").default("text").notNull(),

  telegramMessageId: bigint("telegram_message_id", {
    mode: "number",
  }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export const faqs = pgTable("faqs", {
  id: uuid("id").defaultRandom().primaryKey(),

  question: text("question").notNull(),

  answer: text("answer").notNull(),

  category: text("category").notNull(),

  isActive: boolean("is_active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
