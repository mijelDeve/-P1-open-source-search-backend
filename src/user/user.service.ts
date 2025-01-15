import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const user = this.userRepository.create({ username, email, password });
        return this.userRepository.save(user);
    }

    async findAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOneById(id: number): Promise<User> {
        return this.userRepository.findOne({
          where: { id }, // Aquí usamos el objeto con la condición de búsqueda
        });
      }
}
