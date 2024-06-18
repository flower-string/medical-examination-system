import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Group } from './entities/group.entity';
 
@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private readonly _recordRepository: Repository<Group>,
              @InjectRepository(Item) private readonly _itemRepository: Repository<Item>,) {}

  async create(createGroupDto: CreateGroupDto) {
    if(createGroupDto.itemIds.length <= 1) {
      // return {
      //   message: '至少需要两个体检项目',
      //   code: 2001
      // }
      throw new Error("套餐至少需要两个体检项目");
    }
    const group = new Group()
    group.name = createGroupDto.name;
    group.desc = createGroupDto.desc; 
    group.price = createGroupDto.price;
    group.isdeleted = false;
    const items = new Array(createGroupDto.itemIds.length)
    for(let i = 0; i < items.length; i++) {
      items[i] = await this._itemRepository.findOne({ where: { id: createGroupDto.itemIds[i] } })
    }
    group.items = items;
    const g = await this._recordRepository.save(group);
    return {
      data: g,
      message: "体检套餐创建完成"
    };
  }

  async findAll() {
    const groups = await this._recordRepository.find({
      relations: ['items'],
      where: {
        isdeleted: false
      }
    });
    console.log(`group/findAll, 共查询到${groups.length}条体检套餐`);
    
    return groups;
  }

  findOne(id: number) {
    const group = this._recordRepository.findOne({
      where: { 
        id, 
        isdeleted: false 
      },
    }); 
    return group;
  }

  async update(id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this._recordRepository.findOne({
      where: {
        id
      }
    });
    group.price = updateGroupDto.price;
    group.name = updateGroupDto.name;
    group.desc = updateGroupDto.desc;
    
    const items = new Array(updateGroupDto.itemIds.length);
    for(let i = 0; i < items.length; i++) {
      items[i] = await this._itemRepository.findOne({
        where: {
          id: updateGroupDto.itemIds[i]
        }
      })
    }
  
    group.items = items; 
    const g = await this._recordRepository.save(group);
    return {
      data: g, 
      message: `This action updates a #${id} group`
    };
  }

  remove(id: number) {
    this._recordRepository.update(id, {
      isdeleted: true
    });
    return `This action removes a #${id} group`;
  }
}
