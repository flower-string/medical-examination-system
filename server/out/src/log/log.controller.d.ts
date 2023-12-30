import { LogService } from './log.service';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
export declare class LogController {
    private readonly logService;
    constructor(logService: LogService);
    create(createLogDto: CreateLogDto): Promise<{
        message: string;
        code: number;
        data: number;
    } | {
        data: import("./entities/log.entity").Log;
        code: number;
        message: string;
    }>;
    findAll(): Promise<{
        data: import("./entities/log.entity").Log[];
        message: string;
    }>;
    findLogsByUserId(id: number): Promise<{
        data: import("./entities/log.entity").Log[];
        message: string;
    }>;
    findOne(id: number): Promise<import("./entities/log.entity").Log>;
    cancel(id: number): Promise<{
        code: number;
        message: string;
        data?: undefined;
    } | {
        data: number;
        message: string;
        code?: undefined;
    }>;
    update(id: number, updateLogDto: UpdateLogDto): string;
    pay(id: number): Promise<{
        message: string;
        code: number;
    }>;
    remove(id: number): string;
}
