import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { DEFAULT_LENGTH } from '../../constants';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: DEFAULT_LENGTH,
  }) name: string;

  @ManyToOne(
    () => Category,
    {
      nullable: true,
    },
  ) parent: Category;

  @ManyToOne(
    () => User,
  ) owner: User;
}
