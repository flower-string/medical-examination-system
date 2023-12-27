import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('log')
@ApiTags("预约记录")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  @ApiOkResponse({ description: '新建一条预约，并自动创建关联的体检记录'})
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get()
  @ApiOkResponse({ description: '获取所有预约记录'})
  async findAll() {
    return await this.logService.findAll();
  }

  @Get('user/:id')
  @ApiOkResponse({ description: '获取指定用户的预约记录'})
  findLogsByUserId(@Param('id') id: number) {
    return this.logService.findLogsByUserId(id);
  }

  @Get(':id')
  @ApiOkResponse({ description: '获取指定预约记录'})
  findOne(@Param('id') id: number) {
    return this.logService.findOne(+id);
  }

  @Patch('cancel/:id') 
  @ApiOkResponse({ description: '取消预约'})
  cancel(@Param('id') id: number) {
    return this.logService.cancel(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: '更新预约记录'})
  update(@Param('id') id: number, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(+id, updateLogDto);
  }

  @Patch('pay/:id') 
  @ApiOkResponse({ description: '支付预约费用'})
  pay(@Param('id') id: number) {
    return this.logService.pay(+id);
  }

  @Delete(':id')
  @ApiOkResponse({ description: '删除预约记录'})
  remove(@Param('id') id: number) {
    return this.logService.remove(+id);
  }
}
