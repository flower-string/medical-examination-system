import { DoctorService } from './doctor.service';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    constructor(doctorService: DoctorService);
    create(createDoctorDto: CreateDoctorDto, session: any): Promise<{
        message: string;
        data: import("./entities/doctor.entity").Doctor;
    }>;
    findAll(session: any): Promise<{
        message: string;
        data: import("./entities/doctor.entity").Doctor[];
    }>;
    findOne(id: string, session: any): Promise<{
        message: string;
        data: import("./entities/doctor.entity").Doctor;
    }>;
    update(id: string, updateDoctorDto: UpdateDoctorDto, session: any): Promise<{
        message: string;
        data: {
            message: string;
            data: import("./entities/doctor.entity").Doctor;
        };
    }>;
    remove(id: string, session: any): {
        data: number;
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
        data: import("./entities/doctor.entity").Doctor;
    }>;
}
