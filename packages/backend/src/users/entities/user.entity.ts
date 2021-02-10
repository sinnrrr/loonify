import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate, OneToMany,
} from 'typeorm';
import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { DEFAULT_LENGTH, USER_PASSWORD_LENGTH } from '../../constants';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: DEFAULT_LENGTH,
    nullable: true,
  }) name: string;

  @Column({
    length: DEFAULT_LENGTH,
    unique: true,
  }) email: string;

  @Exclude()
  @Column({
    length: USER_PASSWORD_LENGTH,
  }) password: string;

  @Exclude()
  @Column({
    nullable: true,
  }) refreshToken: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(
    () => Post,
    post => post.owner,
  ) posts: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
