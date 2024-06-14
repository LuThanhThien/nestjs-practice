import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { AuthProviders } from './modules/auth/auth.providers';
import { TenantModule } from './modules/tenant/tenant.module';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      // isGlobal: true,
      envFilePath: '.env'
    }),
    UsersModule,
    AuthModule,
    TenantModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...AuthProviders,
  ],
})
export class AppModule {

}
