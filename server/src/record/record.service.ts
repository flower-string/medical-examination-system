import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './entities/record.entity'; 
import { Repository } from 'typeorm';   

@Injectable()
export class RecordService {
  constructor(@InjectRepository(Record) private readonly _recordRepository: Repository<Record>) {}

  create(createRecordDto: CreateRecordDto) { 
    const record = new Record(); 
    record.itemId = createRecordDto.itemId; 
    record.userId = createRecordDto.userId;
    record.status = 0;
    this._recordRepository.save(record);
    return {
      message: "预约成功",
      data: record
    };
  }

  findAll() {
    const records = this._recordRepository.find();
    return {
      message: "查询成功", 
      data: records
    };
  }

  async findOne(id: number) {
    const records = await this._recordRepository.findOne({
      where: { id },
    });
    
    return records ? {
      message: "查询成功",
      data: records
    } : "no this id";
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    this._recordRepository.update(id, updateRecordDto);
    return {
      message: "更新成功",
    };
  }

  remove(id: number) {
    this._recordRepository.delete(id);
    return {
      message: "删除成功",
    };
  }
}
