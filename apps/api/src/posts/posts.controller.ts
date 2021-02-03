import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestModificationInterceptor } from '../shared/interceptors/request-modification.interceptor';
import { TokenAuthGuard } from '../shared/guards/token-auth.guard';
import { TypeormController } from '../shared/controllers/typeorm.controller';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
@UseGuards(TokenAuthGuard)
@UseInterceptors(new RequestModificationInterceptor())
export class PostsController extends TypeormController {
  constructor(public postsService: PostsService) {
    super(
      'posts',
      postsService,
    );
  }
}
