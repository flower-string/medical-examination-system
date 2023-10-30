import { Item } from "src/item/entities/item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum RecordStatusEnum {
  // 未开始,未缴费
  NOT_START = 0,
  // 进行中
  DOING = 1,
  // 已完成
  FINISHED = 2,
  // 已取消
  CANCELED = 3,
}

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @OneToOne(() => User, userId => userId.id)
  @JoinColumn()
  userId: number;

  @Column()
  @OneToOne(() => Item, itemId => itemId.id)
  @JoinColumn()
  itemId: number;

  @Column({type: 'varchar', default: ''})
  result: string;

  @Column({
    type: 'enum',
    enum: RecordStatusEnum,
  })
  status: number;

  @Column({type: 'varchar', default: ''})
  advice: string;

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}
