import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as session from 'express-session';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const options = new DocumentBuilder().setTitle("健康中心体检系统接口文档").setDescription("接口文档，共同协作，共同完善，之后会进行更新，但基本用法不会更改").setVersion("1.0").build(); 

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api-docs', app, document);
  app.enableCors({
    // origin: ['http://localhost:3000', 'http://8.219.180.234:5000', 'http://localhost:5173', 'http://localhost:8000', 'http://localhost:8080'],
    // credentials: true
  });
  // app.use(session({secret: 'med', rolling: true, name: 'med.sid', cookie: {maxAge: 1000000} }));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter(new Logger()))
  await app.listen(3000); 
}
bootstrap();