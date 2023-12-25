import { Log } from 'src/log/entities/log.entity'
import { Record } from 'src/record/entities/record.entity'
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({type: 'varchar'})
  name: string

  @Column({type: 'varchar', default: '000000'})
  password: string

  @Column({type: 'int', default: 0}) 
  balance: number

  @Column({type: 'boolean', default: false})
  isdeleted: boolean

  @OneToMany(() => Log, (log) => log.user)
  logs: Log[]

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}
