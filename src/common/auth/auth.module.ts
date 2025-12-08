import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Auth0Strategy } from "./auth0.strategy";
import { AuthController } from "./auth.controller";
import { SessionSerializer } from "../sessions/sessions.serializer";
import { User } from "../entities/user.entity";

@Module({
  imports: [
    PassportModule.register({ session: true }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [Auth0Strategy, SessionSerializer],
  controllers: [AuthController],
  exports: [],
})

export class AuthModule {}
