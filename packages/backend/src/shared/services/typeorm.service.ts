import { DeleteResult, FindConditions, FindManyOptions, FindOneOptions, Repository } from 'typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';

export class TypeormService<T, C, U> {
  constructor(protected repo: Repository<T>) {
  }

  async create(createDto: C): Promise<T> {
    const entity = this.repo.create(createDto);
    await this.repo.save(entity);

    return entity;
  }

  async find(options: FindManyOptions<T>): Promise<T[]> {
    return await this.repo.find(options);
  }

  async findOne(options: FindOneOptions<T>): Promise<T> {
    return await this.repo.findOne(options);
  }

  async update(id: number, updateDto: U): Promise<T> {
    await this.repo.update(id, updateDto);

    return this.repo.findOne(id);
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  async paginate(
    options: IPaginationOptions,
    conditions?: FindConditions<T> | FindManyOptions<T>,
  ): Promise<Pagination<T>> {
    options.limit = options.limit > 100 ? 100 : options.limit;
    options.limit = options.limit < 0 ? 10 : options.limit;

    return paginate<T>(
      this.repo,
      options,
      conditions,
    );
  }
}
