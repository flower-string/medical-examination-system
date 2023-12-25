import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
@ApiTags("体检项目接口")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  create(@Body() CreateItemDto) {
    return this.itemService.create(CreateItemDto);
  }

  @Get()
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
