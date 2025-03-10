import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguageService {
  constructor(
    @InjectRepository(Language)
    private languageRepository: Repository<Language>,
  ) {}

  async findAll(): Promise<any> {
    try {
      const lenguages = await this.languageRepository.find();
      console.log(lenguages);

      return {
        message: 'Lenguajes obtenidos con éxito',
        data: lenguages,
      };
    } catch (error) {
      console.log(error);
      return {
        message: 'Error al obtener los lenguajes',
        error: error.message || error,
      };
    }
  }
}
