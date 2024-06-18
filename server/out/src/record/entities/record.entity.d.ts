import { Doctor } from "src/doctor/entities/doctor.entity";
import { Item } from "src/item/entities/item.entity";
import { Log } from "src/log/entities/log.entity";
export declare class Record {
    id: number;
    item: Item;
    result: string;
    status: number;
    doctor: Doctor;
    log: Log;
    advice: string;
    createTime: Date;
    updateTime: Date;
}
