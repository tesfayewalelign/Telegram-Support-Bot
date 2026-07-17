import { bot } from "./bot/bot";

async function startBot() {
  try {
    console.log("Starting Telegram bot...");

    await bot.telegram.getMe();

    console.log("Telegram API connection successful");

    await bot.launch();

    console.log("✅ Bot started");
  } catch (error) {
    console.error("❌ Bot failed:");
    console.error(error);
  }
}

startBot();
