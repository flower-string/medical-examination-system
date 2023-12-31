import { Controller, Get, Post, Body, Patch, Param, Delete, Session, ForbiddenException, Headers } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import session from 'express-session';
import { JwtService } from '@nestjs/jwt';

@Controller('doctor')
@ApiTags("医生接口")
export class DoctorController {
  constructor(private readonly doctorService: DoctorService, 
              private readonly jwtService: JwtService) {}

  @Post()
  @ApiOkResponse({ description: "创建一个医生, 需要管理员权限" })
  create(@Body() createDoctorDto: CreateDoctorDto, @Headers('authorization') authorization) {

    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.doctorService.create(createDoctorDto);
  }

  @Get()
  @ApiOkResponse({ description: "获取所有医生，需要管理员权限" })
  findAll(@Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.doctorService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: "获取指定的医生信息，需要管理员权限或医生权限" })
  findOne(@Param('id') id: string, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin' && user.type !== 'doctor') {
      throw new ForbiddenException("权限不足")
    }
    return this.doctorService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: "更新一个医生的信息，需要管理员权限或医生权限" })
  update(@Param('id') id: string, @Body() updateDoctorDto: UpdateDoctorDto, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin' && user.type !== 'doctor') {
      throw new ForbiddenException("权限不足")
    }
    return this.doctorService.update(+id, updateDoctorDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: "删除一个医生，需要管理员权限" })
  remove(@Param('id') id: string, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.doctorService.remove(+id);
  }

  @Post('login')
  @ApiOkResponse({ description: "医生登录, 登陆后获取医生权限" })
  async login(@Body() body: {name: string, password: string}, @Headers('authorization') authorization) {
    const message = await this.doctorService.login(body);
    if(message.code === 1002) {
      const token = this.jwtService.sign({
        type: 'doctor',
        name: message.data.name,
        id: message.data.id,
      }, {secret: 'med'})
      return {
        token,
        id: message.data.id,
      };
    }
    throw new Error("未知错误");
  }
}
