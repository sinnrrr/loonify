import { Module } from '@nestjs/common';

import { i18nModuleProvider } from '../shared/providers/i18n-module.provider';
import { configModuleProvider } from '../shared/providers/config-module.provider';
import { multerModuleProvider } from '../shared/providers/multer-module.provider';
import { typeormModuleProvider } from '../shared/providers/typeorm-module.provider';

import { I18nModule } from 'nestjs-i18n';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import { PhotosModule } from '../photos/photos.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleProvider),
    I18nModule.forRootAsync(i18nModuleProvider),
    TypeOrmModule.forRootAsync(typeormModuleProvider),
    MulterModule.registerAsync(multerModuleProvider),

    UsersModule,
    AuthModule,
    PostsModule,
    PhotosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
