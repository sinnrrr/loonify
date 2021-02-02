import { BadRequestException, Injectable } from '@nestjs/common';
import { PostsService } from '../posts/posts.service';
import { Post } from '../posts/entities/post.entity'
import { ElasticServiceOptions } from '../shared/interfaces/elastic-service-options.interface';

@Injectable()
export class PhotosService {
  constructor(private readonly postsService: PostsService) {
  }

  async uploadImages(files: any, postId: number) {
    if (files.length == 0) {
      throw new BadRequestException('No images were provided');
    }

    const response = [];
    const photos = [];

    files.forEach(file => {
      const fileResponse = {
        current_name: file.filename,
        original_name: file.originalname,
      };

      photos.push(fileResponse.current_name);
      response.push(fileResponse);
    });

    const postEntity = new Post()
    postEntity.photos = photos

    return await this.postsService.update(postId, postEntity);
  }
}
