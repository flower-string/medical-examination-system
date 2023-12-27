import { Controller, Get, Post, Body, Patch, Param, Delete, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import session from 'express-session';

@Controller('user')
@ApiTags("用户接口")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOkResponse({description: '创建用户'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({description: '获取用户列表'})
  findAll() {
    return this.userService.findAll();
  }

  // @Get('log/:id')
  // findLogs(@Param('id') id: number) {
  //   return this.userService.findLogs(id); 
  // }

  @Get(':id')
  @ApiOkResponse({description: '获取用户信息'})
  findOne(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({description: '更新用户信息'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('renewal/:id')
  @ApiOkResponse({description: '续费'})
  renewal(@Param("id") id: number, @Body("value") value: number) {
    return this.userService.renewal(+id, +value);
  }

  @Delete(':id')
  @ApiOkResponse({description: '删除用户'})
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('login')
  @ApiOkResponse({description: '登录'})
  async login(@Body() body: {name: string, password: string}, @Session() session) {
     const message =  await this.userService.login(body);
     return message;
  }
}
