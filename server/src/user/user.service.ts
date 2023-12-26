import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import session from 'express-session';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

  // insert into user ...entity values(...createDto);
  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    const u = await this._userRepository.save(user);
    console.log(`用户注册成功，id: ${u.id}, name: ${u.name}`);
    
    return {
      message: "用户创建成功",
      data: u
    };
  }

  // select * from user where id = :id
  async findAll() {
    const users = await this._userRepository.find({
      where: {
        isdeleted: false
      }
    });

    if(users.length === 0) {
      console.log("没有用户");
    }
    return {
      message: "查询成功",
      data: users
    };
  }

  async findLogs(id: number) {
    const user = await this._userRepository.findOne({
      relations: ['logs'],
      where: {id},
    })

    return user;
  }

  // select * from user where id = :id
  async findOne(id: number) {
    const user = await this._userRepository.findOne({
      where: {
        id,
        isdeleted: false
      }
    })
    if(!user) {
      throw new Error("用户不存在");
    }
    return {
      message: "查询成功",
      data: user
    };
  }

  // update user set { ...__userRepository: ...UpdateUserDto } where id = :id
  async update(id: number, updateUserDto: UpdateUserDto) {
    this._userRepository.update(id, updateUserDto);
    return {
      message: "用户更新成功",
      data: await this.findOne(id)
    };
  }
 
  async renewal(id: number, value: number) {
    const user = await this._userRepository.findOne({
      where: {
        id,
        isdeleted: false
      }
    })
    if (!user) {
      console.log("为不存在的用户充值");
      throw new Error("用户不存在");
    }
    user.balance += value;
    this._userRepository.save(user);
  }

  // delete from user where id = :id
  remove(id: number) {
    this._userRepository.update(id, {isdeleted: true});
    return {
      message: "用户删除成功",
    };
  }

  async login(body: {name: string, password: string}) {
    const user = await this._userRepository.findOne({
      where: {
        name: body.name,
        isdeleted: false
      }
    })
    if(!user) {
      return {
        code: 1000,
        message: '账号不存在'
      }
    }
    if(user.password !== body.password) {
      return {
        code: 1001,
        message: '密码错误'
      }
    }
    console.log(`用户${user.name}登录成功`);
    
    return {
      code: 1002,
      message: '登录成功',
      data: user
    }
  }
}
