import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { TypeormController } from '../shared/controllers/typeorm.controller';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController extends TypeormController<Category, CreateCategoryDto, UpdateCategoryDto> {
  constructor(public categoriesService: CategoriesService) {
    super(categoriesService);
  }
}
