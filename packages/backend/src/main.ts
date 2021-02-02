import { NestFactory, Reflector } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpExceptionFilter } from './shared/filters/http-exception.filter';
import { TransformInterceptor } from './shared/interceptors/transform.interceptor';
import { ClassSerializerInterceptor, HttpStatus, Logger, ValidationPipe } from '@nestjs/common';

import { NestExpressApplication } from '@nestjs/platform-express';

import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { QueryFailedExceptionFilter } from './shared/filters/query-failed-exception.filter';


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get('application.port');
  const apiPrefix = configService.get('application.apiPrefix');
  const apiVersion = configService.get('application.apiVersion');
  const baseLink = 'http://localhost:' + port + '/';

  const appPrefix = `${apiPrefix}/v${apiVersion}`;
  const swaggerPrefix = appPrefix + '/' + configService.get('swagger.prefix');


  // Request modifications
  app.setGlobalPrefix(appPrefix);

  app.useGlobalFilters(new HttpExceptionFilter(configService));
  app.useGlobalFilters(new QueryFailedExceptionFilter(configService));

  app.useGlobalInterceptors(new TransformInterceptor(configService));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

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
  await app.listen(port);

  Logger.log('App has been launched on ' + baseLink + appPrefix);
  Logger.log('Swagger-styled OpenAPI specifications launched on ' + baseLink + swaggerPrefix);
}

bootstrap();
