import { User } from "../../common/types";
import {
  BaseIntegration,
  IntegrationContext,
  IntegrationRepositories,
} from "../BaseIntegration";
import { v4 } from "uuid";

export interface EngagedMDContext extends IntegrationContext {
  config: {
    practiceId: string;
    apiBaseUrl: string;
    apiUsername: string;
    apiPassword: string;
    authRedirectUrl: string;
    codebaseKey: string;
  };
  state?: {
    userSSOHash?: string;
  };
}

export interface EngagedMDInitArgs extends EngagedMDContext {
  repos: IntegrationRepositories;
}

export class EngagedMDIntegration extends BaseIntegration {
  constructor({ config, state, repos }: EngagedMDInitArgs) {
    super({ config, state }, repos);

    // USER MANAGEMENT
    this.registerCommand("user", "enroll", this.enrollUserCommand);

    // USER AUTH FLOW
    this.registerCommand("auth", "init", this.authInitCommand);
    this.registerCommand("auth", "getRedirectUrl", this.getAuthRedirectUrlCommand);

    // CONTENT
    this.registerCommand("content", "getAssignedContent", this.getAssignedContentCommand);
  }

  // USER COMMAND HANDLERS
  private enrollUserCommand = async (client, user: User) => {
    try {
      const response = await client("/add_patient", {
        method: "POST",
        body: JSON.stringify({
          practiceId: this.context.config.practiceId,
          emrId: user.emrId,
          firstName: user.name.split(" ")[0],
          lastName: user.name.split(" ")[1] || "",
          email: user.email,
          hasPartner: false,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to enroll user: ${response.statusText}`);
      }

      await this.addUserToIntegration(user);
    } catch (error) {
      console.error("Error enrolling user:", error);
      throw error;
    }
  };

  // USER AUTH COMMAND HANDLERS
  private authInitCommand = async (client, user: User) => {
    this.context.state.userSSOHash = v4();

    try {
      const response = await client("/sso", {
        method: "POST",
        body: JSON.stringify({
          practice: this.context.config.practiceId,
          login: user.email,
          token: this.context.state.userSSOHash,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to initiate auth: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error initiating auth:", error);
      throw error;
    }
  };

  private getAuthRedirectUrlCommand = async () => {
    if (!this.context.state.userSSOHash) {
      throw new Error("SSO hash not found in state.");
    }

    const redirectUrl = this.context.config.authRedirectUrl
      .replace("%practice%", this.context.config.practiceId)
      .replace("%token%", this.context.state.userSSOHash || "");

    return redirectUrl;
  };

  // CONTENT COMMAND HANDLERS
  private getAssignedContentCommand = async (client, user: User) => {
    try {
      const response = await client(`/content/assigned?practice=${this.context.config.practiceId}&mpi=${user.emrId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch assigned content: ${response.statusText}`);
      }

      const content = await response.json();
      return content;
    } catch (error) {
      console.error("Error fetching assigned content:", error);
      throw error;
    }
  };
}
