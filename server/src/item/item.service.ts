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
    return 'This action adds a new item';
  }

  findAll() {
    const items = this._itemRepository.find();
    return items;
  }

  async findOne(id: number) {
    const items = await this._itemRepository.findOne({
      where: { id },
    });
    return items[0];
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    this._itemRepository.update(id, updateItemDto);
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    this._itemRepository.delete(id);
    return `This action removes a #${id} item`;
  }
}
