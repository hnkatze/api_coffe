import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '0.0.0.0', // Reemplaza con el origen permitido
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
const config = new DocumentBuilder()
.setTitle('Berlins API')
.setDescription('Esta es la API de Berlins')
.setVersion('1.0')
.addTag('berlin')
.build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
