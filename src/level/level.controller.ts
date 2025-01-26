import { Controller, Get } from '@nestjs/common';
import { LevelService } from './level.service';
import { Level } from './entities/level.entity';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  async findAll(): Promise<Level[]> {
    return this.levelService.findAll()
  }
}
