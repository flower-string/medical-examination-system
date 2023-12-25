import { IsArray, IsNumber, NotEquals } from "class-validator";

export class CreateLogDto {
  @IsNumber()
  @NotEquals(0)
  pay: number;

  @IsNumber()
  @NotEquals(0)
  userId: number;

  @IsArray()
  @NotEquals(0)
  items: number[];
}
