import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecordService } from './record.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('record')
@ApiTags("体检记录接口")
export class RecordController {
  constructor(private readonly recordService: RecordService) {}

  // 创建新体检记录
  @Post()
  create(@Body() createRecordDto: CreateRecordDto) {
    return this.recordService.create(createRecordDto);
  }

  // 返回所有体检记录
  @Get() 
  findAll() {
    return this.recordService.findAll();
  }

  // // 返回某用户的所有体检记录 
  @Get('user/:id')
  findRecordsByUserId(@Param("id") id: number) {    
    return this.recordService.findRecordsByUserId(+id);
  }

  // 返回某医生的所有体检记录
  @Get('doctor/:id')
  findRecordsByDoctorId(@Param('id') id: number) {
    return this.recordService.findRecordsByDoctorId(+id);
  }

  // 返回指定的一次体检记录
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.recordService.findOne(+id);
  }

  // 更新某次体检记录
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordService.update(+id, updateRecordDto);
  }

  // 删除某体检记录
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.recordService.remove(+id);
  }
}
