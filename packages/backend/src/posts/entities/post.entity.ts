import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Category } from '../../categories/entities/category.entity';
import { DEFAULT_LENGTH, POST_TITLE_LENGTH } from '../../constants';

export class Location {
  @IsNotEmpty()
  lat: number;

  @IsNotEmpty()
  lng: number;

  radius?: number;
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: POST_TITLE_LENGTH,
    nullable: false
  }) title: string;

  @Column({
    nullable: false
  }) description: string;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Location)
  @Column('jsonb', {
    nullable: false
  }) location: Location;

  @Column({
    length: DEFAULT_LENGTH,
    nullable: true
  }) reward: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('simple-array', {
    nullable: true
  }) photos: string[];

  @ManyToOne(
    () => User,
    user => user.posts,
    {
      cascade: true,
    },
  ) owner: User

  @ManyToMany(
    () => Category,
    { cascade: true },
  ) @JoinTable()
  categories: Category[];
}
