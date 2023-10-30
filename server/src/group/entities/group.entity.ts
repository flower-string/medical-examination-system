import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'varchar'})
  desc: string;

  @Column({type: 'int'})
  price: number;

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}
