import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(createAdminDto: CreateAdminDto): string;
    findAll(): string;
    findOne(id: string): Promise<{
        data: import("./entities/admin.entity").Admin;
        message: string;
    }>;
    update(id: string, updateAdminDto: UpdateAdminDto): string;
    remove(id: string): string;
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
        data: import("./entities/admin.entity").Admin;
    }>;
}
