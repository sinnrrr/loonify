import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService extends TypeOrmCrudService<Post> {
  constructor(@InjectRepository(Post) repo) {
    super(repo);
  }
}
