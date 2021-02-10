import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { TypeormService } from '../shared/services/typeorm.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService extends TypeormService<Category, CreateCategoryDto, UpdateCategoryDto>{
  constructor(@InjectRepository(Category) private readonly categoriesRepository: Repository<Category>) {
    super(categoriesRepository);
  }
}
