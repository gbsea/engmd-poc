import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from './common/sessions/sessions.module';
import { AuthModule } from './common/auth/auth.module';
import { Role } from './common/entities/role.entity';
import { User } from './common/entities/user.entity';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';

import { HealthModule } from './mvc/health/health.module';

import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig],
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const db = config.get('db');

        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.name,
          entities: [User, Role],
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    SessionsModule,
    AuthModule,
    HealthModule
  ],
  controllers: [AppController]
})

export class AppModule {}
