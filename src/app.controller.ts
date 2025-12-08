import { Controller, Get, Res, Req } from "@nestjs/common";
import { User as AuthUser } from "./common/auth/user.decorator";
import { Response } from "express";

@Controller()
export class AppController {
  @Get("/")
  async index(@AuthUser() user, @Req() req, @Res() res: Response) {
    if (!user) {
      return res.redirect("/login");
    }

    return res.render("index", {
      user,
      links: [{ label: "Logout", href: "/logout" }],
    });
  }
}
