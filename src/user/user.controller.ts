import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post('register')
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
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

  @Put('update-user-data')
  @UseGuards(JwtAuthGuard)
  updateUserData(@Request() req, @Body() userRequestDto: UpdateUserDto) {
    return this.userService.updateUserData(req.user, userRequestDto);
  }
}
