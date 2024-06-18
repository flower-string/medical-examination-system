import { Record } from "src/record/entities/record.entity";
import { User } from "src/user/entities/user.entity";
export declare class Log {
    id: number;
    pay: number;
    records: Record[];
    isdeleted: boolean;
    status: number;
    user: User;
    createTime: Date;
    updataTime: Date;
}
