import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeormService } from '../shared/services/typeorm.service';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService extends TypeormService<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(User) protected repo: Repository<User>) {
    super(repo);
  }
}
