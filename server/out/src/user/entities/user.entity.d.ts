import { Log } from 'src/log/entities/log.entity';
export declare class User {
    id: number;
    name: string;
    password: string;
    balance: number;
    isdeleted: boolean;
    logs: Log[];
    createTime: Date;
    updateTime: Date;
}
