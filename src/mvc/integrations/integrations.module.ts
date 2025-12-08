import { Module } from "@nestjs/common";
import { EngagedMdModule } from "./engagedmd/engagedmd.module";

@Module({
  imports: [EngagedMdModule],
})
export class IntegrationModule {}
