import { Controller, Get, Res, Req } from "@nestjs/common";
import { User as AuthUser } from "./common/auth/user.decorator";
import { Response } from "express";
import { DataSource } from "typeorm";
import { User as UserEntity } from "./common/entities/user.entity";
import { User } from "./common/types";
import { EngagedMDIntegration } from "./integrations/engagedmd/EngagedMDIntegration";

@Controller()
export class AppController {
  constructor(private readonly dataSource: DataSource) {}

  @Get("/")
  async index(@AuthUser() user, @Req() req, @Res() res: Response) {
    if (!user) {
      return res.redirect("/login");
    }

    const authProviderUser = user?.profile?._json ?? {};
    const dbUser = await this.dataSource.getRepository(UserEntity).findOne({
      where: { remId: authProviderUser.sub },
      relations: ["role"],
    });

    if(!dbUser) {
      return res.send("User not found.");
    }

    const mergedUser = {
      ...authProviderUser,
      emrId: dbUser?.emrId,
      role: dbUser?.role
    } as User;

    const engagedMD = new EngagedMDIntegration({
      config: {
        practiceId: process.env["ENGAGEDMD_PRACTICE"]!,
        apiBaseUrl: process.env["ENGAGEDMD_API_BASE_URL"]!,
        authRedirectUrl: process.env["ENGAGEDMD_AUTH_CALLBACK_URL"]!,
        apiUsername: process.env["ENGAGEDMD_USERNAME"]!,
        apiPassword: process.env["ENGAGEDMD_PASSWORD"]!,
      }
    });

    // await engagedMD.runCommand("auth", "init", mergedUser);
    // const redirectUri = await engagedMD.runCommand("auth", "getRedirectUrl", mergedUser);

    // console.log("EngagedMD SSO Redirect URI:", redirectUri);

    return res.render("index", {
      user: mergedUser,
      links: [{ label: "Logout", href: "/logout" }],
    });
  }
}
