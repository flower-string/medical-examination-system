import { IsString, NotEquals } from 'class-validator'

export class CreateUserDto {
  @IsString()
  @NotEquals('', { message: 'name is required' })
  name: string;

  @IsString()
  @NotEquals('', { message: 'password is required' })
  password: string = "000000";
}
