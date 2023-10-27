import { Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';

@Controller('medicalitem')
export class MedicalItemController {
  @Get()
  findAll(): string {
    return 'This action returns all medicalitems';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return 'this action returns a #id medicalitem' + `the id is ${id}`;
  }

  @Post()
  create(): string {
    return 'This action adds a new medicalitem';
  }

  @Put(':id')
  update(@Param('id') id: string) {
    return `This action updates a #id medicalitem` + `the id is ${id}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #id medicalitem` + `the id is ${id}`;
  }
}
