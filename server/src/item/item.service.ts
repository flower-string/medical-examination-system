import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ItemService {
  constructor(@InjectRepository(Item) private readonly _itemRepository: Repository<Item>) {}
  create(createItemDto: CreateItemDto) {
    const item = new Item();
    item.name = createItemDto.name;
    item.price = createItemDto.price;
    item.desc = createItemDto.desc;
    item.doctorId = createItemDto.doctorId;
    this._itemRepository.save(item);
    console.log(item);
    return {
      message: '体检项目创建成功',
      data: item
    };
  }

  findAll() {
    const items = this._itemRepository.find();
    return {
      message: '查询成功',
      data: items
    };
  }

  async findOne(id: number) {
    const items = await this._itemRepository.findOne({
      where: { id },
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
    this._itemRepository.delete(id);
    return {
      message: "体检项目删除成功"
    };
  }
}
