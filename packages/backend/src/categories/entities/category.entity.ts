import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DEFAULT_LENGTH } from '../../constants';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: DEFAULT_LENGTH,
  }) name: string

  @ManyToOne(
    () => User,
    {
      cascade: true,
    },
  ) owner: User
}
