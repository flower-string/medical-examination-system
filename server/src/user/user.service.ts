import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly _userRepository: Repository<User>) {}
  create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.password = createUserDto.password;
    this._userRepository.save(user);
    return 'This action adds a new user';
  }

  findAll() {
    const users = this._userRepository.find();
    return users;
  }

  async findOne(id: string) {
    const users = await this._userRepository.find({
      where: {
        id
      }
    })
    // console.log(users);
    return users[0];
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this._userRepository.update(id, updateUserDto);
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    this._userRepository.delete(id);
    return `This action removes a #${id} user`;
  }
}
