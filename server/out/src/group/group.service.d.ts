import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { Item } from 'src/item/entities/item.entity';
import { Group } from './entities/group.entity';
export declare class GroupService {
    private readonly _recordRepository;
    private readonly _itemRepository;
    constructor(_recordRepository: Repository<Group>, _itemRepository: Repository<Item>);
    create(createGroupDto: CreateGroupDto): Promise<{
        data: Group;
        message: string;
    }>;
    findAll(): Promise<Group[]>;
    findOne(id: number): Promise<Group>;
    update(id: number, updateGroupDto: UpdateGroupDto): Promise<{
        data: Group;
        message: string;
    }>;
    remove(id: number): string;
}
