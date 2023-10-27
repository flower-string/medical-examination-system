import { Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { UserService } from 'src/services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  findAll(): string[] {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  create(): string {
    return this.userService.create();
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #id user` + `the id is ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #id user` + `the id is ${id}`;
  }
}
