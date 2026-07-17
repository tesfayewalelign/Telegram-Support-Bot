import { Context } from "telegraf";

import { userRepository } from "../../repositories/user.repositories";
import { adminKeyboard } from "../keyboards/admin.keyboards";

export async function adminCommand(ctx: Context) {
  const telegramId = ctx.from?.id;

  if (!telegramId) {
    return;
  }

  const user = await userRepository.findByTelegramId(telegramId);

  if (!user || !user.isAdmin) {
    await ctx.reply("❌ You are not authorized as admin.");

    return;
  }

  await ctx.reply("🛠 Admin Panel\n\nChoose an option:", adminKeyboard);
}
