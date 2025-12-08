import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Integration } from "../../../common/entities/integration.entity";
import { UserIntegration } from "../../../common/entities/user-integration.entity";
import { User } from "../../../common/entities/user.entity";
import { EngagedMdController } from "./engagedmd.controller";
import { EngagedMdService } from "./engagedmd.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Integration, UserIntegration])],
  controllers: [EngagedMdController],
  providers: [EngagedMdService],
})
export class EngagedMdModule {}
