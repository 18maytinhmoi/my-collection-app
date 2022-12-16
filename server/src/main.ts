import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { appConfig, AppConfig } from './configs/app.config';
import { databaseConfig, DatabaseConfig } from './configs/data.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<AppConfig>(appConfig.KEY);
  const database = app.get<DatabaseConfig>(databaseConfig.KEY);

  // app.enableCors({ credentials: true, origin: config.client });
  app.enableShutdownHooks();

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Chat App')
    .setDescription('API Document')
    .setVersion('1.0.0')
    .addServer(config.domain, 'Development API')

    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup(`${globalPrefix}/docs`, app, document, {
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });

  await app.listen(config.port);

  console.log(`Server in ${process.env.NODE_ENV} mode`);
  console.log(`Server is listening on :${config.port}/${globalPrefix}`);
  console.log(`Swagger: ${config.domain}/${globalPrefix}/docs`);
}
bootstrap();
