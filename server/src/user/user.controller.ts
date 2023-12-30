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
  @ApiOkResponse({description: '创建用户，任意权限均可访问'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({description: '获取用户列表, 需要管理员权限'})
  findAll(@Session() session) {
    if(session.loginType !== 'admin') {
      throw new Error('权限不足');
    }
    return this.userService.findAll();
  }

  // @Get('log/:id')
  // findLogs(@Param('id') id: number) {
  //   return this.userService.findLogs(id); 
  // }

  @Get(':id')
  @ApiOkResponse({description: '获取用户信息，需要用户权限或管理员权限'})
  findOne(@Param('id') id: number, @Session() session) {
    if(session.loginType !== 'admin' && session.loginType !== 'user') {
      throw new Error("权限不足");
    }
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({description: '更新用户信息，需要用户权限或管理员权限'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Session() session) {
    if(session.loginType !== 'admin' && session.loginType !== 'user') {
      throw new Error("权限不足");
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('renewal/:id')
  @ApiOkResponse({description: '续费，需要用户权限或管理员权限'})
  renewal(@Param("id") id: number, @Body("value") value: number, @Session() session) {
    if(session.loginType !== 'admin' && session.loginType !== 'user') {
      throw new Error("权限不足");
    }
    return this.userService.renewal(+id, +value);
  }

  @Delete(':id')
  @ApiOkResponse({description: '删除用户，需要用户权限或管理员权限'})
  remove(@Param('id') id: string, @Session() session) {
    if(session.loginType !== 'admin' && session.loginType !== 'user') {
      throw new Error("权限不足");
    }
    return this.userService.remove(+id);
  }

  @Post('login')
  @ApiOkResponse({description: '普通用户登录，登陆后获取普通用户权限'})
  async login(@Body() body: {name: string, password: string}, @Session() session) {
     const message = await this.userService.login(body);
     if(message.code == 1002) {
       session.user = message.data;
       session.loginType = 'admin';
     }
     return message;
  }
}
