import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { TypeormService } from '../shared/services/typeorm.service';
import { FindOneOptions, Repository } from 'typeorm';
import * as argon2 from 'argon2';

@Injectable()
export class UsersService extends TypeormService<User, CreateUserDto, UpdateUserDto> {
  constructor(@InjectRepository(User) protected repo: Repository<User>) {
    super(repo);
  }

  async verifyArgonHash(
    condition: FindOneOptions<User>,
    hash: string,
    key: string
  ) {
    const user = await this.repo.findOne(condition);
    if (user && await argon2.verify(user[key], hash)) {
      return user;
    }

    return null;
  }

  async setRefreshToken(id: number, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken)

    await this.repo.update(id, {
      refreshToken: hashedRefreshToken
    })
  }
}
