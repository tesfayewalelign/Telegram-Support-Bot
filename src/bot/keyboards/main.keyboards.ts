import { Markup } from "telegraf";

export const mainKeyboard = Markup.keyboard([
  ["🎫 Contact Support"],
  ["❓ FAQs"],
  ["📞 Contact Admin"],
])
  .resize()
  .persistent();
