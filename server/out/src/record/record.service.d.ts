import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { Record } from './entities/record.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Item } from 'src/item/entities/item.entity';
import { Log } from 'src/log/entities/log.entity';
export declare class RecordService {
    private readonly _recordRepository;
    private readonly _userRepository;
    private readonly _itemRepository;
    private readonly _doctorRepository;
    private readonly _logRepository;
    constructor(_recordRepository: Repository<Record>, _userRepository: Repository<User>, _itemRepository: Repository<Item>, _doctorRepository: Repository<Doctor>, _logRepository: Repository<Log>);
    create(createRecordDto: CreateRecordDto): Promise<{
        message: string;
        data: Record;
        code: number;
    }>;
    findRecordsByDoctorId(doctorId: number): Promise<{
        data: Record[];
        code: number;
        message: string;
    }>;
    findRecordsByUserId(userId: number): Promise<{
        data: Record[];
        message: string;
        code: number;
    }>;
    findAll(): Promise<{
        message: string;
        data: Record[];
        code: number;
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: Record;
        code: number;
    }>;
    update(id: number, updateRecordDto: UpdateRecordDto): Promise<{
        message: string;
        data: any;
        code?: undefined;
    } | {
        message: string;
        code: number;
        data?: undefined;
    }>;
    remove(id: number): {
        message: string;
        code: number;
    };
}
