import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Auth0LoginGuard } from "./auth0-login.guard";

@Controller("/")
export class AuthController {
  @Get("login")
  @UseGuards(AuthGuard("auth0"))
  login() {}

  @Get("/auth/callback")
  @UseGuards(Auth0LoginGuard)
  callback(@Req() req, @Res() res) {
    req.logIn(req.user, (err) => {
      if (err) {
        return res.redirect("/login");
      }
      return res.redirect("/");
    });
  }

  @Get("logout")
  logout(@Req() req, @Res() res) {
    req.logout(() => res.redirect("/"));
  }
}
