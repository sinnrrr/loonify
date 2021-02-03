import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsOptional()
  @MaxLength(64)
  name?: string

  @MaxLength(64)
  @IsNotEmpty()
  @IsEmail()
  email: string

  @MaxLength(60)
  @IsNotEmpty()
  password: string
}
