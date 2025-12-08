import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User as UserEntity } from "../../common/entities/user.entity";

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {}

  async getIndexView(user: any) {
    const dbUser = await this.users.findOne({
      where: { remId: user.sub },
      relations: ["integrations", "integrations.integration"],
    });

    const integrations =
      dbUser?.integrations
        ?.map((userIntegration) => userIntegration.integration)
        .filter((integration): integration is NonNullable<typeof integration> => Boolean(integration))
        .map((integration) => ({
          name: integration.name,
          description: integration.description,
          iconUrl: integration.iconUrl,
          launchUrl: integration.launchUrl,
        })) || [];

    return {
      user,
      links: [{ label: "Logout", href: "/logout" }],
      integrations,
    };
  }
}
