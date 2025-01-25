import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ){}

    async validateUser(username: string, password: string): Promise <any>{
        const user = await this.userRepository.findOne({ where: { username }});


        if(!user || !(await bcrypt.compare(password, user.password))) {
            return null
        }

        const { password: _, ...result } = user;
        return result
    }

    async login(user: any) {
        console.log(user)
        const payload = { username: user.username, sub: user.id }

        return {
            access_token: this.jwtService.sign(payload)
        }   
    }
}
