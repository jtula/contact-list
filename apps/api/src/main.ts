/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

 import { ValidationPipe } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors({
    allowedHeaders: ['content-type'],
    origin: 'http://localhost:4200',
    credentials: true,
  });
  const port = process.env.PORT || 3333;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
