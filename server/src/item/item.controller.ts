import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('item')
@ApiTags("体检项目接口")
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  @ApiOkResponse({ description: '新建一个体检项目'})
  create(@Body() CreateItemDto) {
    return this.itemService.create(CreateItemDto);
  }

  @Get()
  @ApiOkResponse({ description: '获取所有体检项目'})
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: '获取单个体检项目'})
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: '更新一个体检项目'})
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: '删除一个体检项目'})
  remove(@Param('id') id: string) {
    return this.itemService.remove(+id);
  }
}
