import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './entities/group.entity';
import { Item } from 'src/item/entities/item.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Group, Item])], 
  controllers: [GroupController],
  providers: [GroupService, JwtService]
})
export class GroupModule {}
