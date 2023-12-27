import { ApiProperty } from "@nestjs/swagger";
import { IsString, NotEquals } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @NotEquals('', { message: 'Doctor name is required'})
  @ApiProperty({ example: 'John Doe', description: '用户名' })
  name: string;

  @IsString()
  @NotEquals('', { message: 'Doctor speciality is required'})
  @ApiProperty({ example: '000000', description: '密码' })
  password: string = "123456";
}
