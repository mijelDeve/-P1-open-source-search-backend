import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOrigin = process.env.CORS_ORIGIN || '*'; // Usa '*' si no está definida la variable

  app.enableCors({
    origin: corsOrigin, // Permite el origen específico
    methods: 'GET, POST, PUT', // Métodos permitidos
    allowedHeaders: 'Content-Type, Authorization', // Encabezados permitidos
    credentials: true, // Si necesitas enviar cookies o cabeceras de autenticación
  });

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


  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Opcional, transforma los valores de la solicitud según los tipos de datos
    forbidNonWhitelisted: true, // Opcional, rechaza propiedades no definidas en el DTO
    whitelist: true, // Opcional, elimina las propiedades no definidas en el DTO
  }));



  await app.listen(3002);
}

bootstrap();
