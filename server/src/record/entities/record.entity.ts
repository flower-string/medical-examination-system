import { Doctor } from "src/doctor/entities/doctor.entity";
import { Item } from "src/item/entities/item.entity";
import { Log } from "src/log/entities/log.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn, ManyToOne } from "typeorm";

enum RecordStatusEnum {
  // 进行中
  DOING = 0,
  // 已完成
  FINISHED = 1,
  // 已取消
  CANCEL = 2,
  // 未付费
  NOPAY = 3,
}

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;
 
  // @ManyToOne(() => User, (user) => user.records)
  // @JoinColumn()
  // user: User;

  @ManyToOne(() => Item, (item) => item.records)
  @JoinColumn()
  item: Item;

  @Column({type: 'varchar', default: ''})
  result: string;

  @Column({
    type: 'enum',
    enum: RecordStatusEnum,
    default: 0
  })
  status: number;

  @ManyToOne(() => Doctor, (doctor) => doctor.records)
  @JoinColumn()
  doctor: Doctor

  // 配置级联删除
  @ManyToOne(() => Log, (log) => log.id, { onDelete: "CASCADE" })
  @JoinColumn()
  log: Log

  @Column({type: 'varchar', default: ''})
  advice: string;

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}

