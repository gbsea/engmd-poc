import { User } from "../../common/types";
import { BaseIntegration, IntegrationContext } from "../BaseIntegration";
import { v4 } from "uuid";

export interface EngagedMDContext extends IntegrationContext {
  config: {
    practiceId: string;
    apiBaseUrl: string;
    apiUsername: string;
    apiPassword: string;
    authRedirectUrl: string;
  };
  state?: {
    userSSOHash?: string;
  };
}

export class EngagedMDIntegration extends BaseIntegration {
  constructor(context: EngagedMDContext) {
    super(context);

    // USER MANAGEMENT
    this.registerCommand("user", "enroll", this.enrollUserCommand);

    // USER AUTH FLOW
    this.registerCommand("auth", "init", this.authInitCommand);
    this.registerCommand("auth", "getRedirectUrl", this.authRedirectCommand);
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

  private authRedirectCommand = async (client, user: User) => {
    if (!this.context.state.userSSOHash) {
      throw new Error("SSO hash not found in state.");
    }

    const redirectUrl = this.context.config.authRedirectUrl
      .replace("%practice%", this.context.config.practiceId)
      .replace("%token%", this.context.state.userSSOHash || "");

    return redirectUrl;
  };
}
