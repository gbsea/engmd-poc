import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from './common/sessions/sessions.module';
import { AuthModule } from './common/auth/auth.module';
import { Role } from './common/entities/role.entity';
import { User } from './common/entities/user.entity';
import { Integration } from './common/entities/integration.entity';
import { UserIntegration } from './common/entities/user-integration.entity';
import { LoggingModule } from './common/logging/logging.module';

import appConfig from './config/app.config';
import databaseConfig from './config/database.config';
import integrationsConfig from './config/integrations/integrations.config';

import { HealthModule } from './mvc/health/health.module';
import { IndexModule } from './mvc/index/index.module';
import { IntegrationModule } from './mvc/integrations/integrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, integrationsConfig],
      envFilePath: '.env'
    }),
    LoggingModule,
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
          entities: [User, Role, Integration, UserIntegration],
          autoLoadEntities: true,
          synchronize: true
        };
      },
    }),
    SessionsModule,
    AuthModule,
    HealthModule,
    IndexModule,
    IntegrationModule
  ],
  controllers: []
})

export class AppModule {}
