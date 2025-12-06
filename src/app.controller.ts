import { Controller, Get, Res, Req } from "@nestjs/common";
import { User } from "./common/auth/user.decorator";
import { Response } from "express";

@Controller()
export class AppController {
  @Get("/")
  index(@User() user, @Req() req, @Res() res: Response) {
    if (!user) {
      return res.redirect("/login");
    }

    return res.render('index', {
      user: user?.profile?._json,
      links: [
        { label: 'Logout', href: '/logout' },
      ],
    });
  }
}
