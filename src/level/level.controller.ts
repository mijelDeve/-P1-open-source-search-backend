import { Controller, Get } from '@nestjs/common';
import { LevelService } from './level.service';

@Controller('level')
export class LevelController {
  constructor(private readonly levelService: LevelService) {}

  @Get()
  async findAll(): Promise<any> {
    return this.levelService.findAll()
  }
}
