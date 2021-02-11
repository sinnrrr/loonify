import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { TypeormService } from '../shared/services/typeorm.service';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetBoundedDto } from './dto/get-bounded.dto';

@Injectable()
export class PostsService extends TypeormService<Post, CreatePostDto, UpdatePostDto> {
  constructor(@InjectRepository(Post) repo) {
    super(repo);
  }

  async getBounded({ east, west, north, south }: GetBoundedDto) {
    return await this.repo
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.category', 'category')
      .where(`
      (location -> 'lat')::NUMERIC 
        BETWEEN ${Math.min(east, west)} AND ${Math.max(east, west)}
        AND
      (location -> 'lng')::NUMERIC
        BETWEEN ${Math.min(south, north)} AND ${Math.max(south, north)}`,
      ).addSelect('post.category_id').getMany();
  }
}
