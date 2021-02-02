import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Category } from './entities/category.entity';
import { CategoriesService } from './categories.service';

@Crud({
  model: {
    type: Category,
  },
})
@Controller("companies")
export class CategoriesController implements CrudController<Category> {
  constructor(public service: CategoriesService) {}
}
