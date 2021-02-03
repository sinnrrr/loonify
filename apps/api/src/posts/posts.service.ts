import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TypeormService } from '../shared/services/typeorm.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService extends TypeormService<Post, CreatePostDto, UpdatePostDto> {
  constructor(@InjectRepository(Post) repo) {
    super(repo)
  }
}
