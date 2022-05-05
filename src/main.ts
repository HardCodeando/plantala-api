import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Plantala')
    .setDescription('Plantala API description')
    .setVersion('1.0')
    .addTag('Plantala')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/swagger', app, document);

  const config: ConfigService = app.get(ConfigService);
  const port: number = config.get<number>('PORT');
  await app.listen(port);
}

bootstrap();
