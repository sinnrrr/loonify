import { Body, Controller, Get, Query, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { PostsService } from './posts.service';
import { RequestModificationInterceptor } from '../shared/interceptors/request-modification.interceptor';
import { TypeormController } from '../shared/controllers/typeorm.controller';
import { ApiTags } from '@nestjs/swagger';
import { JwtAccessAuthGuard } from '../auth/guards/jwt-access-auth.guard';
import { GetBoundedDto } from './dto/get-bounded.dto';

@ApiTags('posts')
@Controller('posts')
// @UseGuards(JwtAccessAuthGuard)
// @UseInterceptors(new RequestModificationInterceptor())
export class PostsController extends TypeormController {
  constructor(public postsService: PostsService) {
    super(
      'posts',
      postsService,
    );
  }

  @Get('bounded')
  @UsePipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }))
  async bounded(@Query() getBoundedDto: GetBoundedDto) {
    return this.postsService.getBounded(getBoundedDto);
  }
}
