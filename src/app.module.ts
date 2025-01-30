import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestsModule } from './requests/requests.module';
import { LevelModule } from './level/level.module';
import { LanguageModule } from './language/language.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Language } from './language/entities/language.entity';
import { Level } from './level/entities/level.entity';
import { Request } from './requests/entities/request.entity';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { HealthController } from './health/auth.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Language, Level, Request],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([User, Language, Level, Request]),
    RequestsModule,
    LevelModule,
    LanguageModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController, UserController, HealthController],
  providers: [AppService, UserService],
})
export class AppModule {}
