import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from '../entities/user.entity';
import { mergeAuthProviderAndDbUser } from '../auth/user.mapper';
import { User } from '../types';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,
  ) {
    super();
  }

  serializeUser(user: any, done: (err: Error, user: any) => void) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: (err: Error, payload: any) => void) {
    try {
      const authProviderUser = payload?.profile?._json;

      if (!authProviderUser?.sub) {
        return done(null, null);
      }

      const dbUser = await this.users.findOne({
        where: { remId: authProviderUser.sub },
        relations: ['role'],
      });

      if (!dbUser) {
        return done(null, null);
      }

      const mergedUser = mergeAuthProviderAndDbUser(authProviderUser, dbUser) as User;
      return done(null, mergedUser);
    } catch (error) {
      return done(error as Error, null);
    }
  }
}
