import { Markup } from "telegraf";

export const adminKeyboard = Markup.keyboard([
  ["📂 Open Tickets"],
  ["👥 Users", "📊 Statistics"],
  ["⚙ Settings"],
]).resize();
