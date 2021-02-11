import { IsNotEmpty, MaxLength } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Category } from '../entities/category.entity';

export class CreateCategoryDto {
  @IsNotEmpty()
  @MaxLength(64)
  name: string

  child: Category

  @IsNotEmpty()
  owner: User
}
