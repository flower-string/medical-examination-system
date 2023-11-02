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
    return {
      message: 'Doctor created successfully',
      data: doctor
    };
  }

  async findAll() {
    const doctors = await this._doctorRepository.find();
    return {
      message: 'Doctors retrieved successfully',
      data: doctors
    };
  } 

  async findOne(id: number) {
    const result = await this._doctorRepository.find({
      where: {
        id
      }
    })
    return {
      message: 'Doctor retrieved successfully',
      data: result
    };
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto) {
    await this._doctorRepository.update(id, updateDoctorDto);
    return {
      message: 'Doctor updated successfully',
      data: await this.findOne(id)
    };
  }

  remove(id: number) {
    this._doctorRepository.delete(id);
    return {
      message: 'Doctor deleted successfully',
    };
  }
}
