import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AppModule } from "./app.module";
import { join } from 'path';
import * as express from 'express';
import { AppLogger } from "./common/logging/app-logger.service";
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });

  const logger = app.get(AppLogger);
  app.useLogger(logger);

  console.log = (...args: any[]) => logger.log(args.map(String).join(" "));
  console.warn = (...args: any[]) => logger.warn(args.map(String).join(" "));
  console.error = (...args: any[]) => logger.error(args.map(String).join(" "));

  app.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      logger.log(
        `${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`,
        "Access",
      );
    });
    next();
  });

  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'src/views'));
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
