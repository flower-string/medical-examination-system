import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UserService {
    private readonly _userRepository;
    constructor(_userRepository: Repository<User>);
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: User;
    }>;
    findAll(): Promise<{
        message: string;
        data: User[];
    }>;
    findLogs(id: number): Promise<User>;
    findOne(id: number): Promise<{
        message: string;
        data: User;
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: {
            message: string;
            data: User;
        };
    }>;
    renewal(id: number, value: number): Promise<void>;
    remove(id: number): {
        message: string;
    };
    login(body: {
        name: string;
        password: string;
    }): Promise<{
        code: number;
        message: string;
        data?: undefined;
    } | {
        code: number;
        message: string;
        data: User;
    }>;
}
