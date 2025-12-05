import { Controller, Get, Res, Req } from "@nestjs/common";
import { User } from "./common/auth/user.decorator";
import { Response } from "express";

@Controller()
export class AppController {
  @Get("/")
  index(@User() user, @Req() req, @Res({ passthrough: true }) res: Response) {
    if (!user) {
      res.redirect("/login");
      return;
    }

    return user?.profile?._json;
  }
}
