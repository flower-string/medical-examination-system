import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly _adminRepository;
    constructor(_adminRepository: Repository<Admin>);
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    findOne(id: number): Promise<{
        data: Admin;
        message: string;
    }>;
    update(id: number, updateAdminDto: UpdateAdminDto): string;
    remove(id: number): string;
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
        data: Admin;
    }>;
}
