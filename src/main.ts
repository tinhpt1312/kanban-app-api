import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ENV, setupSwagger } from './config';
import { httpsOptions } from './config/https.config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    httpsOptions: ENV.HTTPS.ENABLED ? httpsOptions : undefined,
  });

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());

  setupSwagger(app);

  await app.listen(ENV.APP_PORT, () => {
    let LOCAL_DOMAIN = `http://localhost`;

    if (ENV.HTTPS.ENABLED) {
      LOCAL_DOMAIN = `https://${ENV.HTTPS.DOMAIN}`;
    }

    Logger.log(`API Server running on ${LOCAL_DOMAIN}:${ENV.APP_PORT}/api`);
  });
}

bootstrap();
