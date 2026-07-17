import { Telegraf } from "telegraf";

import { userService } from "../../services/user.service";
import { mainKeyboard } from "../keyboards/main.keyboards";

export function registerStartCommand(bot: Telegraf) {
  bot.start(async (ctx) => {
    const telegramUser = ctx.from;

    await userService.registerUser({
      telegramId: telegramUser.id,
      firstName: telegramUser.first_name,

      ...(telegramUser.username ? { username: telegramUser.username } : {}),

      ...(telegramUser.last_name ? { lastName: telegramUser.last_name } : {}),

      ...(telegramUser.language_code
        ? { languageCode: telegramUser.language_code }
        : {}),
    });

    await ctx.reply(
      `Welcome ${telegramUser.first_name}! 👋

Choose one of the options below.`,
      {
        reply_markup: mainKeyboard.reply_markup,
      },
    );
  });
}
