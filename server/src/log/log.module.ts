import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogController } from './log.controller';
import { Record } from 'src/record/entities/record.entity';
import { Log } from './entities/log.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { RecordService } from 'src/record/record.service';
import { ItemService } from 'src/item/item.service';
import { Item } from 'src/item/entities/item.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Log, Record, User, Item, Doctor])],
  controllers: [LogController],
  providers: [LogService, RecordService, UserService]
})
export class LogModule {}
