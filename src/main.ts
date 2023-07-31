import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('erp/v1');
  app.enableCors();
  await app.listen(3002);
}
bootstrap();
