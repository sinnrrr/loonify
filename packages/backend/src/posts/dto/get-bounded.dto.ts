import { IsNotEmpty } from 'class-validator';

export class GetBoundedDto {
  @IsNotEmpty()
  north: number

  @IsNotEmpty()
  east: number

  @IsNotEmpty()
  south: number

  @IsNotEmpty()
  west: number

  categories: number[]
}
