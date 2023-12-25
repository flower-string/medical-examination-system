import { IsNumber, IsString, NotEquals } from 'class-validator'

export class CreateItemDto {
  @IsString()
  @NotEquals('', { message: 'name is required' })
  name: string; 

  @IsNumber()
  @NotEquals('', { message: 'doctorId is required' })
  doctorId: number;

  @IsNumber()
  @NotEquals('', { message: 'price is required' })
  price: number;

  @IsString()
  @NotEquals('', { message: 'desc is required' })
  desc: string;
}
