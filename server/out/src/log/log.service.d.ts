import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Record } from 'src/record/entities/record.entity';
import { RecordService } from 'src/record/record.service';
import { UserService } from 'src/user/user.service';
export declare class LogService {
    private readonly _logRepository;
    private readonly _userRepository;
    private readonly _recordRepository;
    private readonly recordServer;
    private readonly userServer;
    constructor(_logRepository: Repository<Log>, _userRepository: Repository<User>, _recordRepository: Repository<Record>, recordServer: RecordService, userServer: UserService);
    create(createLogDto: CreateLogDto): Promise<{
        message: string;
        code: number;
        data: number;
    } | {
        data: Log;
        code: number;
        message: string;
    }>;
    findAll(): Promise<{
        data: Log[];
        message: string;
    }>;
    findOne(id: number): Promise<Log>;
    cancel(id: number): Promise<{
        code: number;
        message: string;
        data?: undefined;
    } | {
        data: number;
        message: string;
        code?: undefined;
    }>;
    findLogsByUserId(id: number): Promise<{
        data: Log[];
        message: string;
    }>;
    pay(id: number): Promise<{
        message: string;
        code: number;
    }>;
    update(id: number, updateLogDto: UpdateLogDto): string;
    remove(id: number): string;
}
