import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../../common/entities/user.entity";
import { IndexController } from "./index.controller";
import { IndexService } from "./index.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
