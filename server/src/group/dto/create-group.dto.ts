import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  desc: string

  @IsNumber()
  @IsNotEmpty()
  price: number

  @IsNotEmpty()
  @IsArray()
  itemIds: number[]
}
