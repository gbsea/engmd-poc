import { Controller, Get, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { AuthenticatedGuard } from "../../../common/auth/authenticated.guard";
import { User as AuthUser } from "../../../common/auth/user.decorator";
import { EngagedMdService } from "./engagedmd.service";

@Controller("integrations/engagedmd")
@UseGuards(AuthenticatedGuard)
export class EngagedMdController {
  constructor(private readonly engagedMd: EngagedMdService) {}

  @Get("init")
  async init(@AuthUser() user, @Res() res: Response) {
    const redirectUri = await this.engagedMd.init(user);
    return res.redirect(redirectUri);
  }
}
