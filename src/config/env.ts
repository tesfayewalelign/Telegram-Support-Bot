import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  BOT_TOKEN: z.string().min(1),

  DATABASE_URL: z.string().min(1),

  NODE_ENV: z.enum(["development", "production"]),

  ADMIN_IDS: z.string().default(""),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("❌ Invalid environment variables");
  console.error(result.error.format());

  process.exit(1);
}
export const env = result.data;
