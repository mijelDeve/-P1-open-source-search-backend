import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Language } from 'src/language/entities/language.entity';
import { Level } from 'src/level/entities/level.entity';
import { PaginationDto } from './dto/pagination-request.dto';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request)
    private requestRepository: Repository<Request>,

    @InjectRepository(Language)
    private languageRepository: Repository<Language>,

    @InjectRepository(Level)
    private levelRepository: Repository<Level>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async create(createRequestDto: CreateRequestDto) {
    try {
      const user = await this.userRepository.findOne({ where: { id: Number(createRequestDto.userId) } });
      const language = await this.languageRepository.findOne({ where: { id: Number(createRequestDto.languageId) } });
      const level = await this.levelRepository.findOne({ where: { id: Number(createRequestDto.levelId) } });

      if (!user || !language || !level) {
        throw new Error('Usuario, lenguaje o nivel no encontrado');
      }

      const requestGithub = this.requestRepository.create({
        title: createRequestDto.title,
        description: createRequestDto.description,
        link: createRequestDto.link,
        created_at: new Date(),
        language,
        level,
        user,
      });

      const savedRequest = await this.requestRepository.save(requestGithub);

      return {
        message: 'Solicitud creada correctamente',
        request: savedRequest,
      };
    } catch (error) {
      return {
        message: 'Error al crear la solicitud',
        error: error.message || error,
      };
    }
  }

  async findByUser(id: string) {

    try {
      const user = await this.userRepository.findOne({ where: { id: Number(id) } });

      if (!user) {
        throw new Error('Usuario no encontrado');
      }

      const requests = await this.requestRepository.find({
        where: {
          user
        }
      })

      return {
        message: "Solicitudes obtenidas con éxito",
        data: requests
      }
    } catch (error) {
      return {
        message: 'Error al crear la solicitud',
        error: error.message || error,
      };
    }

  }

  async findAll(paginationDto: PaginationDto): Promise<any> {
    try {

      const { page, limit, languageId, levelId } = paginationDto;

      const skip = (page - 1) * limit;

      const query = this.requestRepository.createQueryBuilder('request')
        .leftJoinAndSelect('request.language', 'language')
        .leftJoinAndSelect('request.level', 'level')
        .skip(skip)
        .take(limit);

      if (languageId) {
        query.andWhere('request.language_id = :languageId', { languageId });
      }

      if (levelId) {
        query.andWhere('request.level_id = :levelId', { levelId });
      }
      const [data, totalCount] = await query.getManyAndCount();

      return {
        message: "Solicitudes obtenidas con éxito",
        data: {
          data,
          totalCount
        }
      }
    } catch (error) {
      return {
        message: 'Error al crear la solicitud',
        error: error.message || error,
      };
    }
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} request`;
  // }

  // update(id: number, updateRequestDto: UpdateRequestDto) {
  //   return `This action updates a #${id} request`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} request`;
  // }
}
