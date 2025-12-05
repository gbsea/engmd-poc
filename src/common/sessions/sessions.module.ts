import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import passport from 'passport';
import { Pool } from 'pg';

@Module({})
export class SessionsModule implements NestModule {
  constructor(private readonly config: ConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    const PgStore = pgSession(session);

    const baseDb = this.config.get('db');

    const db = {
      ...baseDb,
      database: process.env.SESSION_DATABASE!,
    };

    const pool = new Pool({
      host: db.host,
      port: db.port,
      user: db.username,
      password: db.password,
      database: db.database,
      ssl: false
    });

    const sessionMiddleware = session({
      store: new PgStore({ pool, tableName: 'session' }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, sameSite: 'lax' },
    });

    consumer
      .apply(sessionMiddleware, passport.initialize(), passport.session())
      .forRoutes('*');
  }
}
