import { Controller, UseInterceptors, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestModificationInterceptor } from '../shared/interceptors/request-modification.interceptor';
import { TypeormController } from '../shared/controllers/typeorm.controller';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from "../auth/guards/jwt-access-auth.guard";

@ApiTags('posts')
@Controller('posts')
@UseGuards(JwtAccessAuthGuard)
@UseInterceptors(new RequestModificationInterceptor())
export class PostsController extends TypeormController {
  constructor(public postsService: PostsService) {
    super(
      'posts',
      postsService,
    );
  }
}
