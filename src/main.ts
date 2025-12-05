import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  await app.listen(process.env.PORT || 3000);
  console.log(
    `Service running on http://localhost:${process.env.PORT || 3000}. Press CTRL+C to stop.`,
  );
}

bootstrap();
