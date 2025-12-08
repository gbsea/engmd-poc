import { Injectable, ConsoleLogger, Logger, LogLevel } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

type LogLevelName = "error" | "warn" | "info" | "debug" | "verbose";

const logLevelMap: Record<LogLevelName, LogLevel[]> = {
  error: ["error"],
  warn: ["error", "warn"],
  info: ["error", "warn", "log"],
  debug: ["error", "warn", "log", "debug"],
  verbose: ["error", "warn", "log", "debug", "verbose"],
};

@Injectable()
export class AppLogger extends ConsoleLogger {
  constructor(private readonly configService: ConfigService) {
    super("App");
    this.configureLevels();
  }

  private configureLevels() {
    const configuredLevel = (this.configService.get<string>("app.logLevel") ||
      "info") as LogLevelName;

    const levels = logLevelMap[configuredLevel] || logLevelMap.info;
    Logger.overrideLogger(levels);
  }
}
