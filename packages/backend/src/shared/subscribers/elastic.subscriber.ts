import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent, RemoveEvent, UpdateEvent,
} from 'typeorm';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticServiceOptions } from '../interfaces/elastic-service-options.interface';

interface ShouldHaveEntity {
  id: number
}

@EventSubscriber()
export class ElasticSubscriber<T> implements EntitySubscriberInterface<T> {
  constructor(
    connection: Connection,
    protected readonly elasticsearchService: ElasticsearchService,
    protected readonly elasticOptions: ElasticServiceOptions,
  ) {
    connection.subscribers.push(this);
  }

  afterInsert(event: InsertEvent<T>) {
    this.elasticsearchService.create<T>(this.constructQuery(event.entity));
  }

  afterUpdate(event: UpdateEvent<T>) {
    console.log(event.entity);
    this.elasticsearchService.update<T>(this.constructQuery(event.entity));
  }

  afterRemove(event: RemoveEvent<T>) {
    this.elasticsearchService.delete<T>(this.constructQuery(event.entity));
  }

  constructQuery(rawEntity: T) {
    const parsedEntity = rawEntity as unknown as ShouldHaveEntity;

    return {
      ...this.elasticOptions,
      id: parsedEntity.id.toString(),
      body: parsedEntity,
    };
  }
}
