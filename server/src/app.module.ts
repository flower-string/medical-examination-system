import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// 控制器
import { MedicalItemController } from './controllers/MedicalItem.controller';
import { UserController } from './controllers/user.controller';
import { LogController } from './controllers/log.controller';

// 服务依赖
import { UserService } from './services/user.service';

// MySQL实体
import { User } from './entitys/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'homework',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [MedicalItemController, UserController, LogController],
  providers: [UserService],
})

export class AppModule {}
