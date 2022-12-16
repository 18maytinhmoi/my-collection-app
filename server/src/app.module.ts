import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';

import { AuthModule } from './authentication/auth.module';
import { HttpExceptionFilter } from './common/filters/exceptions.filter';
import { appConfig, authConfig, DatabaseConfig, databaseConfig } from './configs';

import { SecurityModule } from './modules/security/security.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `./src/configs/env/.development.env`,
      load: [authConfig, appConfig, databaseConfig],
    }),

    MikroOrmModule.forRootAsync({
      inject: [databaseConfig.KEY],
      useFactory: (dbConfig: DatabaseConfig) => ({
        type: 'postgresql',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        dbName: dbConfig.dbName,

        debug: true,
        registerRequestContext: false,
        autoLoadEntities: true,
        allowGlobalContext: true,
        // entities: ['../../modules/**/entities/*.postgresql.entity.js'],
        // baseDir: __dirname,
      }),
    }),

    AuthModule,
    UserModule,
    SecurityModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
