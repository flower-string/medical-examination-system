import { Controller, Get, Post, Body, Patch, Param, Delete, Session, ForbiddenException, Headers } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import session from 'express-session';
import { JwtService } from '@nestjs/jwt';

@Controller('record')
@ApiTags("体检记录接口")
export class RecordController {
  constructor(private readonly recordService: RecordService,
              private readonly jwtService: JwtService) {}

  // 创建新体检记录
  // @Post()
  // create(@Body() createRecordDto: CreateRecordDto) {
  //   return this.recordService.create(createRecordDto);
  // }

  // 返回所有体检记录
  @Get() 
  @ApiOkResponse({ description: '返回所有体检记录' })
  findAll() {
    return this.recordService.findAll();
  }

  // // 返回某用户的所有体检记录 
  @ApiOkResponse({ description: '返回某用户的所有体检记录'})
  @Get('user/:id')
  findRecordsByUserId(@Param("id") id: number) {    
    return this.recordService.findRecordsByUserId(+id);
  }

  // 返回某医生的所有体检记录
  @Get('doctor/:id')
  @ApiOkResponse({ description: '返回某医生的所有体检记录' })
  findRecordsByDoctorId(@Param('id') id: number) {
    return this.recordService.findRecordsByDoctorId(+id);
  }

  // 返回指定的一次体检记录
  @Get(':id')
  @ApiOkResponse({ description: '返回指定的一次体检记录' })
  findOne(@Param('id') id: number) {
    return this.recordService.findOne(+id);
  }

  // 更新某次体检记录
  @Patch(':id')
  @ApiOkResponse({ description: '更新某次体检记录，需要医生权限或管理员权限' })
  update(@Param('id') id: number, @Body() updateRecordDto: UpdateRecordDto, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin' && user.type !== 'doctor') {
      throw new ForbiddenException("权限不足")
    }
    return this.recordService.update(+id, updateRecordDto);
  }

  // 删除某体检记录
  @Delete(':id')
  @ApiOkResponse({ description: '删除某体检记录' })
  remove(@Param('id') id: number) {
    return this.recordService.remove(+id);
  }
}
