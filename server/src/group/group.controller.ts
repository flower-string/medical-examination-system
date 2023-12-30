import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import session from 'express-session';

@Controller('group')
@ApiTags("体检套餐接口")
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOkResponse({ description: '创建体检套餐，需要管理员权限' })
  create(@Body() createGroupDto: CreateGroupDto, @Session() session) {
    if(session.loginType !== "admin") {
      throw new Error("权限不足");
    }
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOkResponse({ description: '查询全部体检套餐' })
  async findAll() {
    return {
      data: await this.groupService.findAll(),
      message: "查询全部体检套餐成功"
    }
  }

  @Get(':id')
  @ApiOkResponse({ description: '查询单个体检套餐' })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ description: '修改单个体检套餐，需要管理员权限' })
  update(@Param('id') id: number, @Body() updateGroupDto: UpdateGroupDto, @Session() session) {
    if(session.loginType !== "admin") {
      throw new Error("权限不足");
    }
    return this.groupService.update(+id, updateGroupDto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: '删除单个体检套餐，需要管理员权限' })
  remove(@Param('id') id: string, @Session() session) {
    if(session.loginType !== "admin") {
      throw new Error("权限不足");
    }
    return this.groupService.remove(+id);
  }
}
