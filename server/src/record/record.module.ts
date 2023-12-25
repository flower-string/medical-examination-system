import { Module } from '@nestjs/common';
import { RecordService } from './record.service';
import { RecordController } from './record.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Record } from './entities/record.entity';
import { User } from 'src/user/entities/user.entity';
import { Item } from 'src/item/entities/item.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Log } from 'src/log/entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record, User, Item, Doctor, Log])],
  controllers: [RecordController],
  providers: [RecordService]
})
export class RecordModule {}
