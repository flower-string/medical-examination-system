import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Record } from "src/record/entities/record.entity";
import { Item } from "src/item/entities/item.entity";

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', unique: true})
  name: string;

  @Column({type: 'varchar'})
  password: string;

  @Column({type: 'boolean', default: false})
  isdeleted: boolean;

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;

  @OneToMany(() => Record, (records) => records.doctor)
  // @JoinColumn()
  records: Record[]

  @OneToMany(() => Item, (item) => item.doctor)
  // @JoinColumn()
  items: Item[]
}
