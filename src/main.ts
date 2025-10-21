import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(morgan('dev'));
  // app.use(helmet());
  app.use(compression());
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}
console.log('🔍 ENV MONGO_URI:', process.env.MONGO_URI);
console.log('🔍 ENV PORT:', process.env.PORT);
bootstrap();
