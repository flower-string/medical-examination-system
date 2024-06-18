import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';
export declare class DoctorService {
    private readonly _doctorRepository;
    constructor(_doctorRepository: Repository<Doctor>);
    create(createDoctorDto: CreateDoctorDto): Promise<{
        message: string;
        data: Doctor;
    }>;
    findAll(): Promise<{
        message: string;
        data: Doctor[];
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: Doctor;
    }>;
    update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<{
        message: string;
        data: {
            message: string;
            data: Doctor;
        };
    }>;
    remove(id: number): {
        data: number;
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
        data: Doctor;
    }>;
}
