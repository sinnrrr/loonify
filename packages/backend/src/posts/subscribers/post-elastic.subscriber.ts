import {
  EventSubscriber,
} from 'typeorm';
import { Post } from '../entities/post.entity';
import { ElasticSubscriber } from '../../shared/subscribers/elastic.subscriber';
import { InjectConnection } from '@nestjs/typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticServiceOptions } from '../../shared/interfaces/elastic-service-options.interface';
import { POSTS_INDEX, POSTS_TYPE } from '../../constants';

@EventSubscriber()
export class PostElasticSubscriber extends ElasticSubscriber<Post> {
  constructor(
    @InjectConnection() connection,
    protected readonly elasticsearchService: ElasticsearchService,
    protected readonly elasticOptions: ElasticServiceOptions = {
      type: POSTS_TYPE,
      index: POSTS_INDEX,
    },
  ) {
    super(connection, elasticsearchService, elasticOptions);
  }


  listenTo() {
    return Post;
  }
}
