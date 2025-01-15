import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración básica de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Open Source')
    .setDescription('API para gestionar proyectos open source')
    .setVersion('1.0')
    .addTag('requests')
    .build();

  // Crear el documento Swagger
  const document = SwaggerModule.createDocument(app, config);

  // Configurar Swagger UI en el path '/api'
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}

bootstrap();
