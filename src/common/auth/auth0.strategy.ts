import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-auth0';

@Injectable()
export class Auth0Strategy extends PassportStrategy(Strategy, 'auth0', true) {
  constructor() {
    super({
      domain: process.env.AUTH_AUTH0_DOMAIN,
      clientID: process.env.AUTH_AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH_AUTH0_CLIENT_SECRET,
      callbackURL: process.env.AUTH_AUTH0_CALLBACK_URL,
      scope: 'openid profile email',

      // DO NOT ENABLE passReqToCallback unless you handle req manually
      passReqToCallback: false,
    });
  }

  validate(accessToken: string, refreshToken: string, extraParams: any, profile: any) {
    return { profile, idToken: extraParams.id_token };
  }
}
