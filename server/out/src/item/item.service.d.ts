import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { Doctor } from 'src/doctor/entities/doctor.entity';
export declare class ItemService {
    private readonly _itemRepository;
    private readonly _doctorReposotory;
    constructor(_itemRepository: Repository<Item>, _doctorReposotory: Repository<Doctor>);
    create(createItemDto: CreateItemDto): Promise<{
        message: string;
        data: Item;
    }>;
    findAll(): Promise<{
        message: string;
        data: Item[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: Item;
    }>;
    update(id: number, updateItemDto: UpdateItemDto): {
        message: string;
    };
    remove(id: number): {
        message: string;
    };
}
