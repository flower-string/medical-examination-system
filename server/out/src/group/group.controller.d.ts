import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto, session: any): Promise<{
        data: import("./entities/group.entity").Group;
        message: string;
    }>;
    findAll(): Promise<{
        data: import("./entities/group.entity").Group[];
        message: string;
    }>;
    findOne(id: string): Promise<import("./entities/group.entity").Group>;
    update(id: number, updateGroupDto: UpdateGroupDto, session: any): Promise<{
        data: import("./entities/group.entity").Group;
        message: string;
    }>;
    remove(id: string, session: any): string;
}
