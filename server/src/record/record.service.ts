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
    return 'This action adds a new record';
  }

  findAll() {
    const records = this._recordRepository.find();
    return records;
  }

  async findOne(id: number) {
    const records = await this._recordRepository.findOne({
      where: { id },
    });
    
    return records ? records : "no this id";
  }

  update(id: number, updateRecordDto: UpdateRecordDto) {
    this._recordRepository.update(id, updateRecordDto);
    return `This action updates a #${id} record`;
  }

  remove(id: number) {
    this._recordRepository.delete(id);
    return `This action removes a #${id} record`;
  }
}
