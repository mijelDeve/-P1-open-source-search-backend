import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LevelService {
  constructor(
    @InjectRepository(Level)
    private levelRepository: Repository<Level>
  ) { }

  async findAll(): Promise<any> {
    try {
      const levels = this.levelRepository.find();

      return {
        message: "Niveles obtenidos con éxito",
        data: levels
      }
    } catch (error) {
      return {
        message: 'Error al obtener los niveles',
        error: error.message || error,
      };
    }
  }
}
