import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('log')
@ApiTags("预约记录")
export class LogController {
  constructor(private readonly logService: LogService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logService.create(createLogDto);
  }

  @Get()
  async findAll() {
    return await this.logService.findAll();
  }

  @Get('user/:id')
  findLogsByUserId(@Param('id') id: number) {
    return this.logService.findLogsByUserId(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.logService.findOne(+id);
  }

  @Patch('cancel/:id') 
  cancel(@Param('id') id: number) {
    return this.logService.cancel(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateLogDto: UpdateLogDto) {
    return this.logService.update(+id, updateLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.logService.remove(+id);
  }
}
