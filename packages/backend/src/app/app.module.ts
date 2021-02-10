import { Module } from '@nestjs/common';

import { configModuleProvider } from '../shared/providers/config-module.provider';
import { multerModuleProvider } from '../shared/providers/multer-module.provider';
import { typeormModuleProvider } from '../shared/providers/typeorm-module.provider';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { AppController } from './app.controller';
import { PostsModule } from '../posts/posts.module';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [
    ConfigModule.forRoot(configModuleProvider),
    TypeOrmModule.forRootAsync(typeormModuleProvider),
    MulterModule.registerAsync(multerModuleProvider),

    UsersModule,
    AuthModule,
    PostsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
