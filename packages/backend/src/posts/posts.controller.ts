import { Controller, Get, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { TypeormController } from '../shared/controllers/typeorm.controller';
import { ApiTags } from '@nestjs/swagger';
import { GetBoundedDto } from './dto/get-bounded.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@ApiTags('posts')
@Controller('posts')
export class PostsController extends TypeormController<Post, CreatePostDto, UpdatePostDto> {
  constructor(public postsService: PostsService) {
    super(postsService);
  }

  @Get('bounded')
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  async bounded(@Query() getBoundedDto: GetBoundedDto) {
    return this.postsService.getBounded(getBoundedDto);
  }
}
