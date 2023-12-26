import { Injectable } from '@nestjs/common';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DoctorService {
  constructor(@InjectRepository(Doctor) private readonly _doctorRepository: Repository<Doctor>) {}

  async create(createDoctorDto: CreateDoctorDto) {
    const doctor = new Doctor();
    doctor.name = createDoctorDto.name;
    doctor.password = createDoctorDto.password;
    const d = await this._doctorRepository.save(doctor);
    console.log(`医生注册成功，id:${d.id}, name:${d.name}`);
    
    return {
      message: 'Doctor created successfully',
      data: doctor
    };
  }

  async findAll() {
    const doctors = await this._doctorRepository.find({
      where: {
        isdeleted: false
      }
    });

    if(doctors.length === 0) {
      console.log("无医生");
    }
    return {
      message: 'Doctors retrieved successfully',
      data: doctors
    };
  } 

  async findOne(id: number) {
    const result = await this._doctorRepository.findOne({
      where: {
        id,
        isdeleted: false
      }
    })
    if(!result) {
      throw new Error("未发现医生");
    }
    
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
    this._doctorRepository.update(id, {isdeleted: true});
    return {
      data: id,
      message: 'Doctor deleted successfully',
    };
  }

  async login(body: {name: string, password: string}) {
    const doctor = await this._doctorRepository.findOne({
      where: {
        name: body.name,
        isdeleted: false
      }
    })
    if(!doctor) {
      return {
        code: 1000,
        message: '账号不存在'
      }
    }
    if(doctor.password !== body.password) {
      return {
        code: 1001,
        message: '密码错误'
      }
    }

    return {
      code: 1002,
      message: '登录成功',
      data: doctor
    }
  }
}
