import { Context } from "telegraf";

import { adminService } from "../services/admin.service";
import { Markup } from "telegraf";

export async function openTicketsHandler(ctx: Context) {
  const tickets = await adminService.getOpenTickets();

  if (tickets.length === 0) {
    await ctx.reply("✅ No open tickets.");

    return;
  }

  let message = "📂 Open Tickets\n\n";

  for (const ticket of tickets) {
    await ctx.reply(
      `
🎫 Ticket #${ticket.ticketNumber}

👤 ${ticket.userId}

📝 ${ticket.subject}

`,
      Markup.inlineKeyboard([
        [Markup.button.callback("Open Ticket", `ticket_${ticket.id}`)],
      ]),
    );
  }
}
