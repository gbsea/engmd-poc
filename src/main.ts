import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from 'path';
import * as express from 'express';
import { ConfigService } from "@nestjs/config";
import { findMvcViewDirectories } from "./common/utils/find-mvc-view-directories";
import { setupLogger } from "./common/logging/setup-logger";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = setupLogger(app);

  app.setViewEngine('ejs');
  app.setBaseViewsDir(findMvcViewDirectories(join(__dirname, '..', 'src', 'mvc')));
  app.use('/', express.static(join(__dirname, '..', 'public')));

  const configService = app.get(ConfigService);
  const port = configService.get<number>("app.port") || Number(process.env.PORT) || 3000;
  const appName = configService.get<string>("app.name");

  await app.listen(port);
  logger.log(
    `${appName} running on http://localhost:${port}. Press CTRL+C to stop.`,
  );
}

bootstrap();
