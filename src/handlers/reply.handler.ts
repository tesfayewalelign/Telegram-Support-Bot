import { Context } from "telegraf";

import { adminService } from "../services/admin.service";
import { users } from "../db/schema";
import { db } from "../db";
import { eq } from "drizzle-orm";

const waitingReplies = new Map<number, string>();

export function startReply(ctx: Context, ticketId: string) {
  const adminId = ctx.from?.id;

  if (!adminId) return;

  waitingReplies.set(adminId, ticketId);

  return ctx.reply("✍️ Write your reply message:");
}

export async function handleAdminReply(ctx: Context) {
  const adminTelegramId = ctx.from?.id;

  if (!adminTelegramId) return;

  const ticketId = waitingReplies.get(adminTelegramId);

  if (!ticketId) return;

  const message = "text" in ctx.message! ? ctx.message.text : "";

  if (!message) return;

  // find admin user
  const admin = await db.query.users.findFirst({
    where: eq(users.telegramId, adminTelegramId),
  });

  if (!admin) {
    return;
  }

  const result = await adminService.replyToTicket(ticketId, admin.id, message);

  // Send message to user Telegram
  await ctx.telegram.sendMessage(
    result.user.telegramId,
    `💬 Support Reply:\n\n${message}`,
  );

  await ctx.reply("✅ Reply sent to user.");

  waitingReplies.delete(adminTelegramId);

  await ctx.reply("✅ Reply sent.");
}
