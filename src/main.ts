import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.NEST_JS_PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
