import { Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';

@Controller('log')
export class LogController {
  @Get()
  findAll(): string {
    return 'This action returns all logs';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'this action returns a user all logs who #id' + `the id is ${id}`;
  }

  @Post()
  create(): string {
    return 'This action adds a new log';
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #id log` + `the id is ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #id log` + `the id is ${id}`;
  }
}