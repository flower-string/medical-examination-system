import { Controller, Get, Post, Body, Patch, Param, Delete, Session, ForbiddenException, Headers } from '@nestjs/common';
import { ItemService } from './item.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UpdateItemDto } from './dto/update-item.dto';
import session from 'express-session';
import { JwtService } from '@nestjs/jwt';

@Controller('item')
@ApiTags("体检项目接口")
export class ItemController {
  constructor(private readonly itemService: ItemService,
              private readonly jwtService: JwtService) {}

  @Post()
  @ApiOkResponse({ description: '新建一个体检项目，需要管理员权限'})
  create(@Body() CreateItemDto, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.itemService.create(CreateItemDto);
  }

  @Get()
  @ApiOkResponse({ description: '获取所有体检项目，无需权限'})
  findAll() {
    return this.itemService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: '获取单个体检项目，无需权限'})
  findOne(@Param('id') id: string) {
    return this.itemService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: '更新一个体检项目，需要管理员权限'})
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.itemService.update(+id, updateItemDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: '删除一个体检项目'})
  remove(@Param('id') id: string, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.itemService.remove(+id);
  }
}
