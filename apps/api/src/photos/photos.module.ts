import { Module } from '@nestjs/common';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { ConfigModule } from '@nestjs/config';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [ConfigModule, PostsModule],
  controllers: [PhotosController],
  providers: [PhotosService],
  exports: [PhotosService]
})
export class PhotosModule {}
