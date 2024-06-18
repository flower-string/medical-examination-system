import { Column, CreateDateColumn, Entity, JoinColumn, PrimaryGeneratedColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { Record } from "src/record/entities/record.entity";
import { User } from "src/user/entities/user.entity";

enum logStatus {
  // 进行中
  DOING = 0,
  // 已完成
  FINISHED = 1,
  // 已取消
  CANCEL = 2,
  // 未付费
  NOPAY = 3
}

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'int'})
  pay: number;

  @OneToMany(() => Record, (record) => record.log, { cascade: true })
  @JoinColumn()
  records: Record[]

  @Column({type: 'boolean', default: false})
  isdeleted: boolean

  @Column({type: 'enum', default: 3, enum: logStatus})
  status: number

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updataTime: Date;
}
