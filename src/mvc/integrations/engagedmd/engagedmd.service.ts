import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { EngagedMDIntegration } from "../../../integrations/engagedmd/EngagedMDIntegration";
import { User as UserEntity } from "../../../common/entities/user.entity";
import { Integration as IntegrationEntity } from "../../../common/entities/integration.entity";
import { UserIntegration as UserIntegrationEntity } from "../../../common/entities/user-integration.entity";
import { AppLogger } from "../../../common/logging/app-logger.service";

@Injectable()
export class EngagedMdService {
  private readonly engagedMDIntegration: EngagedMDIntegration;

  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
    @InjectRepository(IntegrationEntity)
    private readonly integrations: Repository<IntegrationEntity>,
    @InjectRepository(UserIntegrationEntity)
    private readonly userIntegrations: Repository<UserIntegrationEntity>,
    private readonly configService: ConfigService,
    private readonly logger: AppLogger,
  ) {
    const engagedMdConfig = this.configService.get("integrations.engagedmd")!;

    this.engagedMDIntegration = new EngagedMDIntegration({
      config: {
        codebaseKey: "engagedMD",
        ...engagedMdConfig
      },
      state: {
        userSSOHash: null
      },
      repos: {
        user: this.users,
        integration: this.integrations,
        userIntegration: this.userIntegrations,
      },
      logger: this.logger,
    });
  }

  async init(user: any): Promise<string> {
    const userHasIntegration = await this.engagedMDIntegration.ensureUserHasIntegration(user);

    if(!userHasIntegration) {
      throw new Error("User is not enrolled with EngagedMD integration.");
    }

    await this.engagedMDIntegration.runCommand("auth", "init", user);
    return this.engagedMDIntegration.runCommand("auth", "getRedirectUrl", user);
  }
}
