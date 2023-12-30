import { Doctor } from "src/doctor/entities/doctor.entity";
import { Item } from "src/item/entities/item.entity";
export declare class Group {
    id: number;
    name: string;
    desc: string;
    price: number;
    isdeleted: boolean;
    items: Item[];
    createTime: Date;
    doctor: Doctor;
    updateTime: Date;
}
