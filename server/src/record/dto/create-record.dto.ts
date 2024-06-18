import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator'
import { Log } from 'src/log/entities/log.entity';

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '用户id' })
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 1, description: '项目id' })
  itemId: number;

  @IsNotEmpty()
  @ApiProperty({ example: '2022-01-01', description: '日期' })
  log: Log
}
