import { env } from "./config";

async function bootstrap() {
  console.log("🚀 Starting Forex Support Bot...");
  console.log(`Environment: ${env.NODE_ENV}`);

  console.log("✅ Application started successfully.");
}

bootstrap();
