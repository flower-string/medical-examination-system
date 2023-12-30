import { Injectable } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private readonly _adminRepository: Repository<Admin>) {}
  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  async findOne(id: number) {
    const admin = await this._adminRepository.findOne({
      where: {
        id
      }
    });
    return {
      data: admin,
      message: '管理员信息'
    };
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async login(body: {name: string, password: string}) {
    const admin = await this._adminRepository.findOne({
      where: {
        name: body.name,
      }
    })
    
    if(!admin) {
      return {
        code: 1000,
        message: '账号不存在'
      }
    }
    if(admin.password !== body.password) {
      return {
        code: 1001,
        message: '密码错误'
      }
    }

    return {
      code: 1002,
      message: '登录成功',
      data: admin
    }
  }
}
