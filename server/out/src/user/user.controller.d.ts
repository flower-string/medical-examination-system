import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    findAll(session: any): Promise<{
        message: string;
        data: import("./entities/user.entity").User[];
    }>;
    findOne(id: number, session: any): Promise<{
        message: string;
        data: import("./entities/user.entity").User;
    }>;
    update(id: string, updateUserDto: UpdateUserDto, session: any): Promise<{
        message: string;
        data: {
            message: string;
            data: import("./entities/user.entity").User;
        };
    }>;
    renewal(id: number, value: number, session: any): Promise<void>;
    remove(id: string, session: any): {
        message: string;
    };
    login(body: {
        name: string;
        password: string;
    }, session: any): Promise<{
        code: number;
        message: string;
        data?: undefined;
    } | {
        code: number;
        message: string;
        data: import("./entities/user.entity").User;
    }>;
}
