import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Record } from './entities/record.entity'; 
import { Repository } from 'typeorm';   
import { User } from 'src/user/entities/user.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Item } from 'src/item/entities/item.entity';
import { Log } from 'src/log/entities/log.entity';

@Injectable()
export class RecordService {
  constructor(@InjectRepository(Record) private readonly _recordRepository: Repository<Record>,
              @InjectRepository(User) private readonly _userRepository: Repository<User>,
              @InjectRepository(Item) private readonly _itemRepository: Repository<Item>,
              @InjectRepository(Doctor) private readonly _doctorRepository: Repository<Doctor>,
              @InjectRepository(Log) private readonly _logRepository: Repository<Log>){}

  // 预约体检
  // 该接口不再对用户开放
  async create(createRecordDto: CreateRecordDto) {
    // 查询今天已有的预约数量 
    const cnt = await this._recordRepository.count({
      
    })
    const record = new Record(); 
    record.item = await this._itemRepository.findOne({ 
      where: { id: createRecordDto.itemId },
      relations: ['doctor']
    });
    record.doctor = await this._doctorRepository.findOne({ where: { id: record.item.doctor.id } });
    record.status = 0;
    record.log = createRecordDto.log;
    this._recordRepository.save(record);
    return {
      message: "预约成功",
      data: record,
      code: 200
    };
  }

  // 获取指定医生的所有体检记录
  async findRecordsByDoctorId(doctorId: number) {
    const records = await this._recordRepository.find({
      where: { 
        doctor: { id: doctorId } 
      }
    })
    return {
      data: records,
      code: 200,
      message: 'success'
    };
  }

  // 获取指定用户的所有体检记录
  async findRecordsByUserId(userId: number) {
    const logs = await this._logRepository.find({
      relations: ['records', 'records.item', 'records.doctor'],
      where: { 
        user: { id: userId }
      }
    })
    const records = logs.map(log => log.records).flat(1);
    console.log("返回指定用户的体检记录，总条数为：", records.length);
    return {
      data: records,
      message: '返回指定用户的体检记录',
      code: 200
    }
  }

  // 获取所有体检记录
  async findAll() {
    const records = await this._recordRepository.find({
      relations: ['item', 'doctor', 'log']
    });
    return {
      message: "查询成功", 
      data: records,
      code: 200 
    };
  }

  // 根据ID获取指定的体检记录
  async findOne(id: number) {
    const records = await this._recordRepository.findOne({
      where: { id },
    });
    
    return records ? {
      message: "查询成功",
      data: records,
      code: 200,
    } : {
      message: "未找到该记录",
      data: null,
      code: 2001
    };
  }

  // 更新体检进度
  async update(id: number, updateRecordDto: UpdateRecordDto) {
    // 查询体检是否付费，若未付费，则不能更新
    const { data: record } = await this.findOne(id);
    if(record.status === 3) {
      return {
        message: "该记录未付费，无法开始体检",
        data: null
      }
    }
    // 这里加上await，确保这条记录已经更新完成
    await this._recordRepository.update(id, {
      advice: updateRecordDto.advice,
      result: updateRecordDto.result,
      status: 1
    });
    console.log("体检进度更新成功，编号为：", id);

    // 查找相关联的预约项目是否全部完成，如果全部完成，则将对应的预约也设为完成
    const { log } = await this._recordRepository.findOne({
      relations: ['log', 'log.records'],
      where: {
        id
      }
    })
    let all = true;
    for(const record of log.records) {
      if(record.status === 0 || record.status === 2) {
        all = false;
        break;
      }
    }
    if(all) {
      this._logRepository.update(log.id, {
        status: 1
      });
    }
    return {
      message: "更新成功",
      code: 200
    };
  }

  // 删除体检记录
  remove(id: number) {
    this._recordRepository.delete(id);
    return {
      message: "删除成功",
      code: 200
    };
  }
}
