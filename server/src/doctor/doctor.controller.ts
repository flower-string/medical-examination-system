import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import session from 'express-session';

@Controller('doctor')
@ApiTags("医生接口")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService) {}

  @Post()
  @ApiOkResponse({ description: "创建一个医生, 需要管理员权限" })
  create(@Body() createDoctorDto: CreateDoctorDto, @Session() session) {
    if(session.loginType !== 'admin') {
      throw new Error("权限不足");
    }
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOkResponse({ description: "获取所有医生，需要管理员权限" })
  findAll(@Session() session) {
    if(session.loginType !== 'admin') {
      throw new Error("权限不足");
    }
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: "获取指定的医生信息，需要管理员权限或医生权限" })
  findOne(@Param('id') id: string, @Session() session) {
    console.log(session);
    if(session.loginType !== 'admin' && session.loginType !== 'doctor') {
      throw new Error("权限不足");
    }
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: "更新一个医生的信息，需要管理员权限或医生权限" })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto, @Session() session) {
    if(session.loginType !== 'admin' && session.loginType !== 'doctor') {
      throw new Error("权限不足");
    }
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: "删除一个医生，需要管理员权限" })
  remove(@Param('id') id: string, @Session() session) {
    if(session.loginType !== 'admin') {
      throw new Error("权限不足");
    }
    return this.doctorService.remove(+id);
  }

  @Post('login')
  @ApiOkResponse({ description: "医生登录, 登陆后获取医生权限" })
  async login(@Body() body: {name: string, password: string}, @Session() session) {
    const message = await this.doctorService.login(body);
    if(message.code === 1002) {
      session.name = message.data.name;
      session.loginType = 'doctor';
    }
    return message;
  }
}
