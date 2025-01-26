import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { Repository } from 'typeorm';
import { Language } from 'src/language/entities/language.entity';

@Injectable()
export class LevelService {
    constructor(
        @InjectRepository(Level)
        private levelRepository: Repository<Level>
    ){}

    async findAll(): Promise<Level[]>{
        return this.levelRepository.find();
    }
}
