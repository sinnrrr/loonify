import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { HttpStatus, Logger, ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { QueryFailedExceptionFilter } from './shared/filters/query-failed-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const apiConfiguration = configService.get('application.api')
  const apiRootUrl = `http://${apiConfiguration.host}:${apiConfiguration.port}`;
  const apiBaseUrl = `${apiConfiguration.prefix}/v${apiConfiguration.version}`;

  const swaggerPrefix = apiBaseUrl + '/' + configService.get('swagger.prefix');


  // Request modifications
  app.setGlobalPrefix(apiBaseUrl);

  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.useGlobalFilters(new QueryFailedExceptionFilter(configService));

  app.useGlobalInterceptors(new TransformInterceptor(configService));

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );


  //Security
  app.use(helmet()); // Headers
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later',
  }));


  // Swagger options
  const options = new DocumentBuilder()
    .setTitle(configService.get('swagger.title'))
    .setDescription(configService.get('swagger.description'))
    .setVersion(configService.get('swagger.version'))
    .build();

  // Swagger initialization
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(swaggerPrefix, app, document);


  // Running app
  await app.listen(apiConfiguration.port);

  Logger.log('App has been launched on ' + apiRootUrl + '/' + apiBaseUrl);
  Logger.log('Swagger-styled OpenAPI specifications launched on ' + apiRootUrl + '/' + swaggerPrefix);
}

bootstrap();
