import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(Doctor) private readonly _doctorRepository: Repository<Doctor>) {}

  create(createDoctorDto: CreateDoctorDto) {
    const doctor = new Doctor();
    doctor.name = createDoctorDto.name;
    doctor.password = createDoctorDto.password;
    this._doctorRepository.save(doctor);
    return 'This action adds a new doctor';
  }

  findAll() {
    const doctors = this._doctorRepository.find();
    return doctors;
  }

  findOne(id: number) {
    const result = this._doctorRepository.find({
      where: {
        id
      }
    })
    return `This action returns a #${id} doctor`;
  }

  update(id: number, updateDoctorDto: UpdateDoctorDto) {
    this._doctorRepository.update(id, updateDoctorDto);
    return `This action updates a #${id} doctor`;
  }

  remove(id: number) {
    this._doctorRepository.delete(id);
    return `This action removes a #${id} doctor`;
  }
}
