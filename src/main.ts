import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //intsantiate new validation pipe
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // the variables which are not defined in dto so it will not added. if we still add it in body it will be striped out
    transform: true, // Automatically transform payloads to DTOs
  }))
  await app.listen(3000);
}
bootstrap();
