import "dotenv/config";

export const env = {
  BOT_TOKEN: process.env.BOT_TOKEN!,
  DATABASE_URL: process.env.DATABASE_URL!,
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
