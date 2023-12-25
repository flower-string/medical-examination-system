import { IsNotEmpty, IsNumber } from 'class-validator'
import { Log } from 'src/log/entities/log.entity';

export class CreateRecordDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  itemId: number;

  @IsNotEmpty()
  log: Log
}
