import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private readonly _itemRepository: Repository<Item>, 
              @InjectRepository(Doctor) private readonly _doctorReposotory: Repository<Doctor>) {}
  async create(createItemDto: CreateItemDto) {
    if(createItemDto.price < 0 || createItemDto.price > 1000) {
      // return {
      //   message: 'Price must be between 0 and 1000',
      //   code: 2001
      // }
      throw new Error('Price must be between 0 and 1000');
    }
    const item = new Item();
    item.name = createItemDto.name;
    item.price = createItemDto.price;
    item.desc = createItemDto.desc;
    // item.doctor = createItemDto.doctorId;
    item.doctor = await this._doctorReposotory.findOne({
      where: { id: createItemDto.doctorId }
    })
    const i = await this._itemRepository.save(item);
    return {
      message: '体检项目创建成功',
      data: i
    };
  }
 
  async findAll() {
    const items = await this._itemRepository.find({
      relations: ['doctor'],
      where: {
        isdeleted: false
      }
    });
    console.log(`item/findAll: 共查询到${items.length}条体检项目`);
    return {
      message: '成功查询到全部的体检项目',
      data: items
    };
  }

  async findOne(id: number) {
    const items = await this._itemRepository.findOne({
      where: { 
        id,
        isdeleted: false 
      },
    });
    return {
      message: '查询成功',
      data: items
    };
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    this._itemRepository.update(id, updateItemDto);
    return {
      message: "体检项目更新成功"
    };
  }

  remove(id: number) {
    this._itemRepository.update(id, {
      isdeleted: true
    })
    return {
      message: "体检项目删除成功"
    };
  }
}
