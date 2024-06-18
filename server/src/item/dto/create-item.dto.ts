import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, NotEquals } from 'class-validator'

export class CreateItemDto {
  @IsString()
  @NotEquals('', { message: 'name is required' })
  @ApiProperty({ description: 'Item name', example: 'Item 1' })
  name: string; 

  @IsNumber()
  @NotEquals('', { message: 'doctorId is required' })
  @ApiProperty({ description: 'Doctor id', example: 1 })
  doctorId: number;

  @IsNumber()
  @NotEquals('', { message: 'price is required' })
  @ApiProperty({ description: 'Item price', example: 100 })
  price: number;

  @IsString()
  @NotEquals('', { message: 'desc is required' })
  @ApiProperty({ description: 'Item description', example: 'Item 1 description' })
  desc: string;
}
