import { Doctor } from "src/doctor/entities/doctor.entity";
import { Group } from "src/group/entities/group.entity";
import { Record } from "src/record/entities/record.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20})
  name: string;

  @Column()
  price: number;

  @Column({type: 'varchar'})
  desc: string;

  @Column({type: 'boolean', default: false})
  isdeleted: boolean

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;

  @ManyToMany(() => Group, (group) => group.items)
  @JoinColumn()
  groups: Group[];

  @ManyToOne(() => Doctor, (doctor) => doctor.items)
  @JoinColumn()
  doctor: Doctor

  @OneToMany(() => Record, (record) => record.item)
  @JoinColumn()
  records: Record[]
}
