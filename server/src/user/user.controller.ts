import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Res, ForbiddenException, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt'

@Controller('user')
@ApiTags("用户接口")
export class UserController {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  @Post()
  @ApiOkResponse({description: '创建用户，任意权限均可访问'})
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOkResponse({description: '获取用户列表, 需要管理员权限'})
  findAll(@Headers('authorization') authorization, @Headers() head) {
    console.log(head);
    console.log(authorization);
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin') {
      throw new ForbiddenException("权限不足")
    }
    return this.userService.findAll();
  }

  // @Get('log/:id')
  // findLogs(@Param('id') id: number) {
  //   return this.userService.findLogs(id); 
  // }

  @Get(':id')
  @ApiOkResponse({description: '获取用户信息，需要用户权限或管理员权限'})
  findOne(@Param('id') id: number, ) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({description: '更新用户信息，需要用户权限或管理员权限'})
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin' && user.type !== 'user') {
      throw new ForbiddenException("权限不足")
    }
    return this.userService.update(+id, updateUserDto);
  }

  @Patch('renewal/:id')
  @ApiOkResponse({description: '续费，需要用户权限或管理员权限'})
  renewal(@Param("id") id: number, @Body("value") value: number, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin' && user.type !== 'user') {
      throw new ForbiddenException("权限不足")
    }
    return this.userService.renewal(+id, +value);
  }

  @Delete(':id')
  @ApiOkResponse({description: '删除用户，需要用户权限或管理员权限'})
  remove(@Param('id') id: string, @Headers('authorization') authorization) {
    const user = this.jwtService.verify(authorization, {secret: 'med'});
    if(user.type !== 'admin' && user.type !== 'user') {
      throw new ForbiddenException("权限不足")
    }
    return this.userService.remove(+id);
  }

  @Post('login')
  @ApiOkResponse({description: '普通用户登录，登陆后获取普通用户权限'})
  async login(@Body() body: {name: string, password: string}, @Headers('authorization') authorization) {
     const message = await this.userService.login(body);
     let token;
     if(message.code === 1002) {
        token = this.jwtService.sign({
          type: 'user',
          id: message.data.id,
          name: message.data.name,
        }, {
          secret: 'med',
        })
        return {
          token,
          id: message.data.id,
        }
     }
     throw new Error("未知错误");
     
  }
}
