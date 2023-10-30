import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string

  @Column({type: 'varchar'})
  name: string

  @Column({type: 'varchar'})
  password: string

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}
