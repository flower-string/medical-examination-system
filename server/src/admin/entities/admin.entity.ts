import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar'})
  name: string;

  @Column({type: 'varchar'})
  password: string;

  @CreateDateColumn({type: 'timestamp'})
  createTime: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updateTime: Date;
}
