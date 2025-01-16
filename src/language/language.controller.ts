import { Controller, Get } from '@nestjs/common';
import { LanguageService } from './language.service';
import { Language } from './entities/language.entity';

@Controller('language')
export class LanguageController {
  constructor(private readonly languageService: LanguageService) {}

  @Get()
  async findAll(): Promise<Language[]> {
    return this.languageService.findAll();
  }
}
