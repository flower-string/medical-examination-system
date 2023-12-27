import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('doctor')
@ApiTags("医生接口")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOkResponse({ description: "创建一个医生" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOkResponse({ description: "获取所有医生" })
  findAll() {
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: "获取一个医生" })
  findOne(@Param('id') id: string) {
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: "更新一个医生" })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto) {
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: "删除一个医生" })
  remove(@Param('id') id: string) {
    return this.doctorService.remove(+id);
  }

  @Post('login')
  @ApiOkResponse({ description: "医生登录" })
  async login(@Body() body: {name: string, password: string}) {
    const message = await this.doctorService.login(body);
    return message;
  }
}
