import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from "./app.module";
import session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: process.env["SESSION_SECRET"],
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 * 60 * 24 }
    }),
  );

  await app.listen(process.env.PORT || 3000);
  console.log(`Service running on http://localhost:${process.env.PORT || 3000}`);
}

bootstrap();
