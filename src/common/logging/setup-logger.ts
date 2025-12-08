import { NestExpressApplication } from "@nestjs/platform-express";
import { AppLogger } from "./app-logger.service";

export function setupLogger(app: NestExpressApplication): AppLogger {
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

  return logger;
}
