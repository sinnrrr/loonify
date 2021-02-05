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
import { Post } from '../../posts/entities/post.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    length: 64,
    nullable: true,
  }) name?: string;

  @Column({
    length: 64,
    unique: true,
  }) email?: string;

  @Exclude()
  @Column({
    length: 128
  }) password?: string;

  @Exclude()
  @Column({
    nullable: true,
    name: 'refresh_token'
  }) refreshToken: string;

  @CreateDateColumn({
    name: 'created_at'
  }) createdAt?: Date;

  @UpdateDateColumn({
    name: 'updated_at'
  }) updatedAt?: Date;

  @OneToMany(
    () => Post,
    post => post.owner,
    {
      cascade: true,
    },
  ) posts?: Post[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?() {
    this.password = await argon2.hash(this.password);
  }
}
