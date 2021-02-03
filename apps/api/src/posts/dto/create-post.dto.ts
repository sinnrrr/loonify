import { IsNotEmpty, IsNotEmptyObject, MaxLength } from 'class-validator';

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
  ownerId: number;
}
