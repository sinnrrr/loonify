// import { CrudConfigService } from '@nestjsx/crud'
// import { TokenAuthGuard } from './auth/token-auth.guard';
// import { UseGuards } from '@nestjs/common'
//
// CrudConfigService.load({
//   query: {
//     limit: 25,
//     cache: 2000,
//     alwaysPaginate: true,
//   },
//   routes: {
//     getManyBase: {
//       decorators: [UseGuards(TokenAuthGuard)]
//     },
//     getOneBase: {
//       decorators: [UseGuards(TokenAuthGuard)]
//     },
//     updateOneBase: {
//       decorators: [UseGuards(TokenAuthGuard)]
//     },
//     replaceOneBase: {
//       decorators: [UseGuards(TokenAuthGuard)]
//     },
//     deleteOneBase: {
//       decorators: [UseGuards(TokenAuthGuard)],
//       returnDeleted: true,
//     },
//   }
// })


import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const configService = app.get(ConfigService);
  const globalPrefix = configService.get('application.prefix');
  const port = configService.get('application.port');

  app.setGlobalPrefix(globalPrefix);
  const options = new DocumentBuilder()
    .setTitle('Loonify API')
    .setDescription('Swagger-styled OpenAPI specifications')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(globalPrefix, app, document);

  await app.listen(port, () => Logger.log('Listening at http://localhost:' + port + '/' + globalPrefix));
}

bootstrap();
