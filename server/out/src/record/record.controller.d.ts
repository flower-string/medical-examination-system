import { RecordService } from './record.service';
import { UpdateRecordDto } from './dto/update-record.dto';
export declare class RecordController {
    private readonly recordService;
    constructor(recordService: RecordService);
    findAll(): Promise<{
        message: string;
        data: import("./entities/record.entity").Record[];
        code: number;
    }>;
    findRecordsByUserId(id: number): Promise<{
        data: import("./entities/record.entity").Record[];
        message: string;
        code: number;
    }>;
    findRecordsByDoctorId(id: number): Promise<{
        data: import("./entities/record.entity").Record[];
        code: number;
        message: string;
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: import("./entities/record.entity").Record;
        code: number;
    }>;
    update(id: number, updateRecordDto: UpdateRecordDto, session: any): Promise<{
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
