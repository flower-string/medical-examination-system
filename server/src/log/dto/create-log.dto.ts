import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, NotEquals } from "class-validator";

export class CreateLogDto {
  @IsNumber()
  @NotEquals(0)
  @ApiProperty({ example: 1, description: "用户id" })
  pay: number;

  @IsNumber()
  @NotEquals(0)
  @ApiProperty({ example: 1, description: "用户id" })
  userId: number;

  @IsArray()
  @NotEquals(0)
  @ApiProperty({ example: [1, 2, 3], description: "商品id" })
  items: number[];
}
