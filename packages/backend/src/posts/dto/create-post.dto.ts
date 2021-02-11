import { IsNotEmpty, IsNotEmptyObject, MaxLength } from 'class-validator';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

export class CreatePostDto {
  @IsNotEmpty()
  @MaxLength(128)
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmptyObject()
  location: any;

  reward?: string;

  @IsNotEmpty()
  owner: User;

  @IsNotEmpty()
  category: Category;
}
