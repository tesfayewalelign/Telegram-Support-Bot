import { Telegraf } from "telegraf";
import { env } from "../config/env";
import { registerStartCommand } from "./commands/commands";
import { registerSupportHandler } from "../handlers/support.handler";
import { adminCommand } from "./commands/admin.commands";
import { openTicketsHandler } from "../handlers/admin.handler";
import { ticketSelectHandler } from "../handlers/ticket.handler";
import { startReply, handleAdminReply } from "../handlers/reply.handler";
import { adminService } from "../services/admin.service";

export const bot = new Telegraf(env.BOT_TOKEN);

registerStartCommand(bot);
registerSupportHandler(bot);
bot.command("admin", adminCommand);
bot.hears("📂 Open Tickets", openTicketsHandler);

bot.on("callback_query", async (ctx, next) => {
  const data = "data" in ctx.callbackQuery ? ctx.callbackQuery.data : "";

  if (data.startsWith("ticket_")) {
    return ticketSelectHandler(ctx);
  }

  return next();
});
bot.on("callback_query", async (ctx, next) => {
  const data = "data" in ctx.callbackQuery ? ctx.callbackQuery.data : "";

  if (data.startsWith("reply_")) {
    const ticketId = data.replace("reply_", "");

    return startReply(ctx, ticketId);
  }

  return next();
});
bot.on("text", handleAdminReply);
bot.on("callback_query", async (ctx, next) => {
  const data = "data" in ctx.callbackQuery ? ctx.callbackQuery.data : "";

  if (data.startsWith("close_")) {
    const ticketId = data.replace("close_", "");

    await adminService.closeTicket(ticketId);

    await ctx.reply("🔒 Ticket closed.");

    return;
  }

  return next();
});
