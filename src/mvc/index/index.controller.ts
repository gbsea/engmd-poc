import { Controller, Get, Res, Req } from "@nestjs/common";
import { User as AuthUser } from "../../common/auth/user.decorator";
import { Response } from "express";
import { IndexService } from "./index.service";

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get("/")
  async index(@AuthUser() user, @Res() res: Response) {
    if (!user) {
      return res.redirect("/login");
    }

    return res.render("index", await this.indexService.getIndexView(user));
  }
}
