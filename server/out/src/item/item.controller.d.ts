import { ItemService } from './item.service';
import { UpdateItemDto } from './dto/update-item.dto';
export declare class ItemController {
    private readonly itemService;
    constructor(itemService: ItemService);
    create(CreateItemDto: any, session: any): Promise<{
        message: string;
        data: import("./entities/item.entity").Item;
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./entities/item.entity").Item[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./entities/item.entity").Item;
    }>;
    update(id: string, updateItemDto: UpdateItemDto, session: any): {
        message: string;
    };
    remove(id: string, session: any): {
        message: string;
    };
}
