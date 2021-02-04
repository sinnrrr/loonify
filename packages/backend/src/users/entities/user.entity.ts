import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate, OneToMany,
} from 'typeorm';
import { randomBytes } from 'crypto';
import * as argon2 from 'argon2';
import * as moment from 'moment';
import { Post } from '../../posts/entities/post.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 64, nullable: true })
  name?: string;

  @Column({ length: 64, unique: true })
  email?: string;

  @Exclude()
  @Column({ length: 128 })
  password?: string;

  @Column({ length: 64, nullable: false })
  token?: string;

  @Exclude()
  @Column({ nullable: false, name: 'expires_at' })
  expiresAt?: Date;

  @Exclude()
  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date;

  @Exclude()
  @OneToMany(
    () => Post,
    post => post.owner,
    {
      cascade: true,
    },
  ) posts?: Post[];

  @BeforeInsert()
  async generateAccessToken?() {
    this.token = randomBytes(32).toString('hex');

    this.expiresAt = moment().add(1, 'M').toDate();
  }

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword?() {
    this.password = await argon2.hash(this.password);
  }
}
