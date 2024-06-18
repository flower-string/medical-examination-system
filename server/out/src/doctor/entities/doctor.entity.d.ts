import { Record } from "src/record/entities/record.entity";
import { Item } from "src/item/entities/item.entity";
export declare class Doctor {
    id: number;
    name: string;
    password: string;
    isdeleted: boolean;
    createTime: Date;
    updateTime: Date;
    records: Record[];
    items: Item[];
}
