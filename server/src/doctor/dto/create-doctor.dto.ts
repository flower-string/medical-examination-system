import { IsString, NotEquals } from "class-validator";

export class CreateDoctorDto {
  @IsString()
  @NotEquals('', { message: 'Doctor name is required'})
  name: string;

  @IsString()
  @NotEquals('', { message: 'Doctor speciality is required'})
  password: string = "123456";
}
