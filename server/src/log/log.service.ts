import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Record } from 'src/record/entities/record.entity';
import { Server } from 'mysql2/typings/mysql/lib/Server';
import { RecordService } from 'src/record/record.service';
import { join } from 'path';
import { UserService } from 'src/user/user.service';
import CustomError from 'src/common/error/CustomError';

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private readonly _logRepository: Repository<Log>,
              @InjectRepository(User) private readonly _userRepository: Repository<User>,
              @InjectRepository(Record) private readonly _recordRepository: Repository<Record>,
              private readonly recordServer: RecordService,
              private readonly userServer: UserService) {}

  // 用户预约体检的入口
  async create(createLogDto: CreateLogDto) {
    // 检查今天的预约人数
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 设置时间为当天的开始时间
  
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的开始时间
  
    const count = await this._logRepository
      .createQueryBuilder("log")
      .where("log.createTime >= :start", { start: today })
      .andWhere("log.createTime < :end", { end: tomorrow })
      .getCount();
    console.log("今日已预约人数为：" ,count);
    if (count >= 100) {
      throw new Error("今日预约人数已达到上限");
    }
    const { data: user } = await this.userServer.findOne(createLogDto.userId);
    if(!user) {
      throw new Error("用户不存在"); 
    } 
    if(user.balance < createLogDto.pay) {
      const error = new Error("用户余额不足");
      throw error;
    } 
    const { data: logs } = await this.findLogsByUserId(user.id);
    // 如果有未完成的预约
    for(const log of logs) {
      if(log.status === 0) {
        throw new Error("用户有未完成的预约");
      }
    }
    const log = new Log();
    log.pay = createLogDto.pay;
    this._userRepository.update(user.id, { balance: user.balance - createLogDto.pay })

    log.user = await this._userRepository.findOne({
      where: { id: createLogDto.userId }
    })
    
    const da = await this._logRepository.save(log);
    // const records = new Array(createLogDto.items.length);
    for(let i = 0; i < createLogDto.items.length; i++) {
      await this.recordServer.create({ userId: createLogDto.userId, itemId: createLogDto.items[i], log })
    }

    return { 
      data: da,
      message: "预约成功"
    }
  }

  // 查询所有体检记录
  async findAll() {
    const logs = await this._logRepository.find({
      relations: ['records', 'user', 'records.item', 'records.doctor'],
      where: {
        isdeleted: false
      }
    });
    console.log("log/findAll, 查询到的体检记录条数：" + logs.length);
    return {
      data: logs,
      message: "查询成功"
    };
  }

  // 查询指定的体检记录
  findOne(id: number) {
    const log = this._logRepository.findOne({
      where: { 
        id,
        isdeleted: false
      },
      relations: ['records', 'user', 'records.doctor']
    })
    console.log(`log/findOne, id为${id}的预约记录被查询`);
    
    return log;
  }

  // 取消预约
  async cancel(id: number) {
    // 更新log记录
    await this._logRepository.update(id, {
      status: 2
    })
    // 查找关联数据
    const { records, user, pay } = await this._logRepository.findOne({
      where: { id },
      relations: ['records', 'user']
    });
    // 更新record记录
    for(let i = 0; i < records.length; i++) {
      await this._recordRepository.update(records[i].id, {
        status: 2
      })
    }
    // 退款
    user.balance += pay;
    this._userRepository.save(user);
    // 调试日志
    console.log(`log/cancel, id为${id}的预约记录被取消`);
    return {
      data: id,
      message: "取消成功"
    }
  }
  // 查询指定用户的体检记录
  async findLogsByUserId(id: number) {
    const logs = await this._logRepository.find({
      relations: ['records', 'user', 'records.doctor', 'records.item'],
      where: {
        user: {
          id,
          isdeleted: false
        }
      },
    })
    console.log("log/findLogsByUserId, 查询到的预约记录条数：" + logs.length);
    return {
      data: logs,
      message: '查询预约记录成功'
    };
  }

  update(id: number, updateLogDto: UpdateLogDto) {
    return `the logs is readonly, you can't updata the log`;
  }

  remove(id: number) {
    const log = this._logRepository.delete(id);
    console.log(`log/remove, id为${id}的预约记录被删除`);
    
    return `This action removes a #${id} log`;
  }
}
