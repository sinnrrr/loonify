import { DeleteResult, FindManyOptions, FindOneOptions, Repository, UpdateResult } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

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

    return this.repo.findOne(id)
  }

  async remove(id: number): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<T>> {
    return paginate<T>(this.repo, options);
  }
}
