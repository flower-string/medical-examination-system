import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}

  // insert into user ...entity values(...createDto);
  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    this._userRepository.save(user);
    return {
      message: "用户创建成功",
      data: user
    };
  }

  // select * from user where id = :id
  async findAll() {
    const users = await this._userRepository.find();
    return {
      message: "查询成功",
      data: users
    };
  }

  // select * from user where id = :id
  async findOne(id: number) {
    const user = await this._userRepository.findOne({
      where: {
        id
      }
    })
    // console.log(users);
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

  // delete from user where id = :id
  remove(id: number) {
    this._userRepository.delete(id);
    return {
      message: "用户删除成功",
    };
  }
}
