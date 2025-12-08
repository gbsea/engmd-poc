import { Injectable } from "@nestjs/common";

@Injectable()
export class IndexService {
  getIndexView(user: any) {
    return {
      user,
      links: [{ label: "Logout", href: "/logout" }],
    };
  }
}
