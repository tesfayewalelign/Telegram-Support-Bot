import { Context, Markup } from "telegraf";

import { adminService } from "../services/admin.service";

export async function ticketSelectHandler(ctx: Context) {
  if (!ctx.callbackQuery || !("data" in ctx.callbackQuery)) {
    return;
  }

  const ticketId = ctx.callbackQuery.data.replace("ticket_", "");

  const messages = await adminService.getConversation(ticketId);

  if (messages.length === 0) {
    await ctx.reply("No messages found.");

    return;
  }

  let conversation = "💬 Conversation\n\n";

  for (const msg of messages) {
    conversation += `${msg.content}\n\n`;
  }

  await ctx.reply(
    conversation,
    Markup.inlineKeyboard([
      [Markup.button.callback("✉️ Reply", `reply_${ticketId}`)],
      [Markup.button.callback("🔒 Close", `close_${ticketId}`)],
    ]),
  );
}
