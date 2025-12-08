import {
  Controller,
  Get,
  HttpException,
  Param,
  Query,
  Res,
  UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { AuthenticatedGuard } from "../../../common/auth/authenticated.guard";
import { User as AuthUser } from "../../../common/auth/user.decorator";
import { EngagedMdService } from "./engagedmd.service";

@Controller("integrations/engagedmd")
@UseGuards(AuthenticatedGuard)
export class EngagedMdController {
  constructor(private readonly engagedMd: EngagedMdService) {}

  @Get("init")
  async init(
    @AuthUser() user,
    @Query("assignmentId") assignmentId: string | undefined,
    @Res() res: Response
  ) {
    try {
      const redirectUri = await this.engagedMd.init(user, assignmentId);
      return res.redirect(redirectUri);
    } catch (error) {
      if (error instanceof HttpException) {
        const status = error.getStatus();
        const response = error.getResponse();
        const payload =
          typeof response === "string" ? { message: response } : response;

        return res.status(status).json(payload);
      }

      return res
        .status(500)
        .json({ message: "Failed to initialize EngagedMD integration" });
    }
  }
}
