import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from 'path';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
  app.use('/', express.static(join(__dirname, '..', 'public')));

  await app.listen(process.env.PORT || 3000);
  console.log(
    `Service running on http://localhost:${process.env.PORT || 3000}. Press CTRL+C to stop.`,
  );
}

bootstrap();
