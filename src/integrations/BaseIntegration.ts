import { Repository } from "typeorm";
import {
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { User } from "../common/types";
import { User as UserEntity } from "../common/entities/user.entity";
import { Integration as IntegrationEntity } from "../common/entities/integration.entity";
import { UserIntegration as UserIntegrationEntity } from "../common/entities/user-integration.entity";

export interface IntegrationConfig {
  apiBaseUrl: string;

  apiUsername?: string;
  apiPassword?: string;
  codebaseKey: string;

  [key: string]: any;
}

export interface IntegrationContext {
  config: IntegrationConfig;
  state?: Record<string, any>;
}

export interface IntegrationRepositories {
  user: Repository<UserEntity>;
  integration: Repository<IntegrationEntity>;
  userIntegration: Repository<UserIntegrationEntity>;
}

export type CommandHandler<TInput, TOutput> = (
  client: ApiClient,
  input: TInput
) => Promise<TOutput>;

export type ApiClient = (url: string, init?: RequestInit) => Promise<Response>;

export class BaseIntegration {
  protected context: IntegrationContext;

  private commands = new Map<string, Map<string, CommandHandler<any, any>>>();

  private repos: IntegrationRepositories;

  constructor(context: IntegrationContext, repos: IntegrationRepositories) {
    this.context = context;
    this.repos = repos;
  }

  protected buildClient(): ApiClient {
    const { apiBaseUrl, apiUsername, apiPassword } = this.context.config;

    const authHeader =
      apiUsername && apiPassword
        ? {
            Authorization:
              "Basic " +
              Buffer.from(`${apiUsername}:${apiPassword}`).toString("base64"),
          }
        : {};

    const client: ApiClient = async (path, init = {}) => {
      const fullUrl = `${apiBaseUrl}${path}`;

      const headers = {
        "Content-Type": "application/json",
        ...authHeader,
        ...(init.headers || {}),
      };

      const req: RequestInit = {
        ...init,
        headers,
      };

      const res = await fetch(fullUrl, req);

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(
          `API client failure: ${res.status} ${res.statusText} :: ${msg}`
        );
      }

      return res;
    };

    return client;
  }

  protected getClient() {
    return this.buildClient();
  }

  public async ensureUserHasIntegration(user: any): Promise<Boolean> {
    if (!user) {
      throw new UnauthorizedException("User not authenticated");
    }

    const dbUser = await this.repos.user.findOne({
      where: { remId: user.sub },
      relations: ["role"],
    });

    if (!dbUser) {
      throw new UnauthorizedException("User not found");
    }

    const codebaseKey = this.context?.config?.codebaseKey;

    if (!codebaseKey) {
      throw new NotFoundException("Integration key not configured");
    }

    const integration = await this.repos.integration.findOne({
      where: { codebaseKey: codebaseKey },
    });

    if (!integration) {
      throw new NotFoundException("Integration not configured");
    }

    const userIntegration = await this.repos.userIntegration.findOne({
      where: {
        user: { id: dbUser.id },
        integration: { id: integration.id },
      },
    });

    if (!userIntegration) {
      throw new ForbiddenException("User does not have the integration");
    }

    return true;
  }

  protected async addUserToIntegration(user: User) {
    const integration = await this.repos.integration.findOne({
      where: { codebaseKey: this.context.config.codebaseKey },
    });

    if (!integration) {
      throw new Error("Integration not found in database");
    }

    const dbUser = await this.repos.user.findOne({
      where: { remId: user.sub },
    });

    if (!dbUser) {
      throw new Error("User not found in database");
    }

    const existingUserIntegration = await this.repos.userIntegration.findOne({
      where: {
        user: { id: dbUser.id },
        integration: { id: integration.id },
      },
    });

    if (!existingUserIntegration) {
      await this.repos.userIntegration.save({ user: dbUser, integration });
    }
  }

  protected registerCommand<TI, TO>(
    group: string,
    name: string,
    handler: CommandHandler<TI, TO>
  ) {
    if (!this.commands.has(group)) {
      this.commands.set(group, new Map());
    }
    this.commands.get(group)!.set(name, handler);
  }

  async runCommand<TI, TO>(
    group: string,
    name: string,
    input: TI
  ): Promise<TO> {
    const groupMap = this.commands.get(group);
    if (!groupMap) {
      throw new Error(`Command group '${group}' not found`);
    }

    const handler = groupMap.get(name);
    if (!handler) {
      throw new Error(
        `Command '${group}.${name}' not found in ${this.constructor.name}`
      );
    }

    try {
      const client = this.getClient();
      return await handler(client, input);
    } catch (err: any) {
      throw new Error(
        `[${this.constructor.name}] ${group}.${name} failed: ${err.message}`
      );
    }
  }
}
