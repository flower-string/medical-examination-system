import { ApiProperty } from '@nestjs/swagger';
import { IsString, NotEquals } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @NotEquals('', { message: 'name is required' })
  @ApiProperty({ example: 'John Doe', description: '用户名' })
  name: string;

  @IsString()
  @NotEquals('', { message: 'password is required' })
  @ApiProperty({ example: '000000', description: '密码' })
  password: string = "000000";
}
