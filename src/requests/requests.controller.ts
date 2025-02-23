import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, Request } from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationDto } from './dto/pagination-request.dto';

@Controller('requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post('register')
  @UseGuards(JwtAuthGuard)
  create(@Request() req, @Body() createRequestDto: CreateRequestDto) {
    return this.requestsService.create(createRequestDto, req.user);
  }

  @Get('get-by-user')
  @UseGuards(JwtAuthGuard)
  findByUser(@Request() req) {
    return this.requestsService.findByUser(req.user)
  }

  @Get('get-all-request')
  findAll(@Query() paginationDto: PaginationDto): Promise<any> {
    console.log(paginationDto)
    return this.requestsService.findAll(paginationDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.requestsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateRequestDto: UpdateRequestDto) {
  //   return this.requestsService.update(+id, updateRequestDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.requestsService.remove(+id);
  // }
}
