import { Controller, Get, Res, Req } from "@nestjs/common";
import { User as AuthUser } from "./common/auth/user.decorator";
import { Response } from "express";
import { DataSource } from "typeorm";
import { User } from "./common/entities/user.entity";

@Controller()
export class AppController {
  constructor(private readonly dataSource: DataSource) {}

  @Get("/")
  async index(@AuthUser() user, @Req() req, @Res() res: Response) {
    if (!user) {
      return res.redirect("/login");
    }

    const profile = user?.profile?._json ?? {};
    const dbUser = await this.dataSource.getRepository(User).findOne({
      where: { remId: profile.sub },
      relations: ["role"],
    });

    const roleFromDb = dbUser?.role;
    const role =
      roleFromDb ??
      profile.role;

    const mergedUser = {
      ...profile,
      emrId: dbUser?.emrId ?? profile.emrId,
      role,
    };

    return res.render("index", {
      user: mergedUser,
      links: [{ label: "Logout", href: "/logout" }],
    });
  }
}
