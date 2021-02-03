import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  async validateToken(token: string): Promise<User | any> {
    const user = await this.usersService.findOne({ where: { token } });
    if (user && user.expiresAt > new Date()) {
      return user;
    }

    return null;
  }


  async validateUser(email: string, password: string): Promise<User | any> {
    const user = await this.usersService.findOne({ where: { email } });
    if (user && await argon2.verify(user.password, password)) {
      return user;
    }

    return null;
  }

  async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
    };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
