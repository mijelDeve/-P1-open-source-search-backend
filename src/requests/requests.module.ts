import { Module } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { RequestsController } from './requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { User } from 'src/user/entities/user.entity';
import { Level } from 'src/level/entities/level.entity';
import { Language } from 'src/language/entities/language.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Request, User, Level, Language])
  ],
  controllers: [RequestsController],
  providers: [RequestsService],
})
export class RequestsModule {}
