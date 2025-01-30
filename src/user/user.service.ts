import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async findAllUsers(): Promise<any> {
    try {
      const user = this.userRepository.find();

      return {
        message: "Usuarios obtenidos con éxito",
        data: user
      }
    } catch (error) {
      return {
        message: 'Error al obtener los usuarios',
        error: error.message || error,
      };
    }
  }

  async findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({
      where: { id }, // Aquí usamos el objeto con la condición de búsqueda
    });
  }


  async createUser(username: string, email: string, password: string): Promise<any> {
    try {
      const existingUser = await this.userRepository.findOne({
        where: [{ username }, { email }]
      })
  
      if (existingUser) {
        throw new BadRequestException("El usuario con este username ya está registrado")
      }
  
      const hashedPassword = await bcrypt.hash(password, 10)
  
      const user = this.userRepository.create({ username, email, password: hashedPassword })
  
      this.userRepository.save(user)

      return {
        message: "Usuarios obtenidos con éxito",
        data: user
      }
    } catch (error) {
      // return {
      //   message: 'Error al crear el usuario',
      //   error: error.message || error,
      //   status: 400
      // };
      throw new BadRequestException('Error al crear el usuario: ' + (error.message || error));
    }
  }
}
