import { Doctor } from "src/doctor/entities/doctor.entity";
import { Item } from "src/item/entities/item.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 20})
  name: string;

  @Column({type: 'varchar'})
  desc: string;

  @Column({type: 'int'}) 
  price: number;

  @Column({type: 'boolean', default: false})
  isdeleted: boolean

  @ManyToMany(() => Item, (item) => item.groups)
  // @JoinColumn()
  @JoinTable()
  items: Item[];

  @CreateDateColumn({type: 'timestamp'})
  @JoinColumn()
  createTime: Date;

  @OneToMany(() => Doctor, (doctor) => doctor.items)
  @JoinColumn()
  doctor: Doctor

  @UpdateDateColumn({type: 'timestamp'})
  @JoinColumn()
  updateTime: Date;
}
