import { Telegraf } from "telegraf";

import { supportService } from "../services/support.service";

const supportState = new Map<number, boolean>();

export function registerSupportHandler(bot: Telegraf) {
  // User pressed "Contact Support"
  bot.hears("🎫 Contact Support", async (ctx) => {
    supportState.set(ctx.from.id, true);

    await ctx.reply(
      "📝 Please describe your problem.\n\nSend one message with as much detail as possible.",
    );
  });

  // Listen for all text messages
  bot.on("text", async (ctx, next) => {
    const waiting = supportState.get(ctx.from.id);

    if (!waiting) {
      return next();
    }

    supportState.delete(ctx.from.id);

    const result = await supportService.createTicket(
      ctx.from.id,
      ctx.message.text,
    );

    if (result.isNew) {
      await ctx.reply(
        `✅ Support ticket created successfully!\n\nTicket ID: ${result.ticket.id}\n\nOur support team will contact you soon.`,
      );
    } else {
      await ctx.reply(
        `✅ Your message has been added to your existing support ticket.\n\nTicket ID: ${result.ticket.id}`,
      );
    }

    // TODO:
    // Notify all admins about the new ticket.
  });
}
