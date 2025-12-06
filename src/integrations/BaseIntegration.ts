export interface IntegrationConfig {
  apiBaseUrl: string;

  apiUsername?: string;
  apiPassword?: string;

  [key: string]: any;
}

export interface IntegrationContext {
  config: IntegrationConfig;
  state?: Record<string, any>;
}

export type CommandHandler<TInput, TOutput> = (
  client: ApiClient,
  input: TInput
) => Promise<TOutput>;

export type ApiClient = (url: string, init?: RequestInit) => Promise<Response>;

export class BaseIntegration {
  protected context: IntegrationContext;

  private commands = new Map<string, Map<string, CommandHandler<any, any>>>();

  constructor(context: IntegrationContext) {
    this.context = context;
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
