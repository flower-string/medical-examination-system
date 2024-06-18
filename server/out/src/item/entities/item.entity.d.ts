import { Doctor } from "src/doctor/entities/doctor.entity";
import { Group } from "src/group/entities/group.entity";
import { Record } from "src/record/entities/record.entity";
export declare class Item {
    id: number;
    name: string;
    price: number;
    desc: string;
    isdeleted: boolean;
    createTime: Date;
    updateTime: Date;
    groups: Group[];
    doctor: Doctor;
    records: Record[];
}
