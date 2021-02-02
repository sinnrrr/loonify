import {
  Entity,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { JoinColumn } from 'typeorm';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject, ValidateNested } from 'class-validator';

export class Location {
  @IsNotEmpty()
  lat: number

  @IsNotEmpty()
  lng: number

  radius?: number
}

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 128, nullable: false })
  title?: string;

  @Column({ nullable: false })
  description?: string;

  @IsNotEmptyObject()
  @ValidateNested({ each: true })
  @Type(() => Location)
  @Column('json', { nullable: false })
  location?: Location;

  @Column({ length: 64, nullable: true })
  reward?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Column('simple-array', { nullable: true })
  photos?: string[];

  @Column({ nullable: false, name: 'owner_id' })
  ownerId?: number;

  @JoinColumn({ name: 'owner_id' })
  @ManyToOne(
    () => User,
    user => user.posts,
  ) owner?: User;
}
