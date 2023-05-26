import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// TODO - Написать валидаторы параметров для всех путей и более подробные ошибки

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
