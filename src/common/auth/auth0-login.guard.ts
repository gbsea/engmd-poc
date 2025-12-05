import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class Auth0LoginGuard extends AuthGuard('auth0') {
  constructor() {
    super({ session: true });
  }
}
