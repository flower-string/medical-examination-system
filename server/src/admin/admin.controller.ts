import { Controller, Get, Post, Body, Patch, Param, Delete, Session, Headers } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';

@Controller('admin')
@ApiTags("管理员接口")
@ApiOkResponse({ description: '管理员只有登录合获取信息的接口生效' })
export class AdminController {
  constructor(private readonly adminService: AdminService,
              private readonly jwtService: JwtService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Post('login')
  async login(@Body() body: {name: string, password: string}, @Headers('authorization') authorization) {
    const message = await this.adminService.login(body);
    if(message.code === 1002) {
      const token = this.jwtService.sign({
        id: message.data.id,
        name: message.data.name,
        type: 'admin'
      }, {secret: 'med'})
      console.log("管理员登录");
      return {
        token,
        id: message.data.id
      };
    }
    throw new Error("未知错误");
  }
}
