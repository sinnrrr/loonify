import { Injectable } from '@nestjs/common';
import { STORAGE_LOCATION } from '../constants';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class AppService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {
  }

  serveFile(res: any, file: string) {
    res.sendFile(file, { root: STORAGE_LOCATION });
  }

  async search(query: any) {
    const result = await this.elasticsearchService.search({
        body: {
          from: 0,
          size: 200,
          query: {
            bool: {
              must: {
                multi_match: {
                  query: query.q || query.query,
                  fields: ['title', 'description'],
                },
              },
            },
          },
        },
      },
    );

    return result.body.hits || null
  }
}
