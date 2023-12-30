import { Injectable } from '@nestjs/common';
import { CreateLogDto } from './dto/create-log.dto';
import { UpdateLogDto } from './dto/update-log.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Log } from './entities/log.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Record } from 'src/record/entities/record.entity';
import { RecordService } from 'src/record/record.service';
import { UserService } from 'src/user/user.service';

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
      return {
        message: "今日预约人数已达到上限",
        code: 1001,
        data: 400
      }
    }

    const { data: user } = await this.userServer.findOne(createLogDto.userId);
    if(!user) {
      throw new Error("用户不存在"); 
    } 
    
    const { data: logs } = await this.findLogsByUserId(user.id);
    // 如果有未完成的预约
    for(const log of logs) {
      if(log.status === 0) {
        return {
          message: "有未完成的预约",
          code: 1003,
          data: 400
        }
      }
    }
    const log = new Log();
    log.pay = createLogDto.pay;

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
      code: 1000,
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
    const log = await this.findOne(id);
    // 查询是否已取消或已完成
    if(log.status === 2 || log.status === 1) {
      return {
        code: 1001,
        message: "预约已取消或已完成"
      }
    }
    // 更新log记录
    await this._logRepository.update(id, {
      status: 2
    })
    // 更新record记录
    for(let i = 0; i < log.records.length; i++) {
      await this._recordRepository.update(log.records[i].id, {
        status: 2
      })
    }
    // 退款
    if(log.status == 0) {
      log.user.balance += log.pay;
      this._userRepository.save(log.user);
    }
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

  // 支付
  async pay(id: number) {
    // 查询log记录
    const log = await this.findOne(id);
    // 查询余额
    if(log.user.balance < log.pay) {
      return {
        message: "余额不足",
        code: 2001
      }
    }
    // 扣除余额
    log.user.balance -= log.pay;
    this._userRepository.save(log.user);
    // 支付成功，更新预约状态
    log.status = 0;
    this._logRepository.save(log);
    console.log(`log/pay, id为${id}的预约记录被支付`);

    return {
      message: "支付成功",
      code: 200
    }
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
