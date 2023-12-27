import { ApiProperty } from "@nestjs/swagger"
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '一般体检套餐', description: '体检套餐名称' })
  name: string

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '身高合体重', description: '体检套餐描述' })
  desc: string

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ example: 20, description: '体检价格' })
  price: number

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({ example: [1, 2, 3], description: '体检项目id列表' })
  itemIds: number[]
}
