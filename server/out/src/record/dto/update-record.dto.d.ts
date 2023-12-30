import { CreateRecordDto } from './create-record.dto';
declare const UpdateRecordDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateRecordDto>>;
export declare class UpdateRecordDto extends UpdateRecordDto_base {
    result?: string;
    advice?: string;
}
export {};
