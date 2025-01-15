import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  create(@Body() createUserDto: { username: string; email: string; password: string }): Promise<User> {
    return this.userService.createUser(createUserDto.username, createUserDto.email, createUserDto.password);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOneById(Number(id));
  }
}
