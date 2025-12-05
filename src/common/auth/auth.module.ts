import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { Auth0Strategy } from "./auth0.strategy";
import { AuthController } from "./auth.controller";
import { SessionSerializer } from "../sessions/sessions.serializer";

@Module({
  imports: [PassportModule.register({ session: true })],
  providers: [Auth0Strategy, SessionSerializer],
  controllers: [AuthController],
  exports: [],
})

export class AuthModule {}
