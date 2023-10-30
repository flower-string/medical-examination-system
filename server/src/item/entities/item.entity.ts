import { Doctor } from "src/doctor/entities/doctor.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: string;

  @Column()
  @OneToOne(() => Doctor, doctorId => doctorId.id)
  @JoinColumn()
  doctorId: number;

  @Column()
  price: number;

  @Column({type: 'varchar'})
  desc: string;

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}
