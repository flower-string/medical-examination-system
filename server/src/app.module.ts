import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RecordModule } from './record/record.module';
import { DoctorModule } from './doctor/doctor.module';
import { AdminModule } from './admin/admin.module';
import { ItemModule } from './item/item.module';
import { GroupModule } from './group/group.module';
import { LogModule } from './log/log.module';
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '123456',
      host: 'localhost',
      database: 'homework',
      port: 3306,
      synchronize: true,
      autoLoadEntities: true,
      // entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    JwtModule.register({
      secret: 'med',
      signOptions: {
        expiresIn: '7d'
      }
    }),
    UserModule,
    RecordModule,
    DoctorModule,
    AdminModule,
    ItemModule,
    GroupModule,
    LogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
