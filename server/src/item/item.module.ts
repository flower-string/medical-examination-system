import { Module } from '@nestjs/common';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Doctor } from 'src/doctor/entities/doctor.entity';
import { Group } from 'src/group/entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Item, Doctor, Group])],
  controllers: [ItemController],
  providers: [ItemService]
})
export class ItemModule {}
