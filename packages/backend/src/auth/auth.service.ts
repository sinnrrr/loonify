import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {
  }

  accessConfiguration = <JwtSignOptions>{
    secret: this.configService.get('jwt.access.secret'),
    expiresIn: this.configService.get('jwt.access.expiry'),
  };

  refreshConfiguration = <JwtSignOptions>{
    secret: this.configService.get('jwt.refresh.secret'),
    expiresIn: this.configService.get('jwt.refresh.expiry'),
  };

  async validateUser(email: string, password: string): Promise<User | any> {
    return await this.usersService.verifyArgonHash(
      { where: { email } },
      password,
      'password',
    );
  }

  async login(user: User) {
    const accessPayload = {
      name: user.name,
      sub: user.id,
    };

    const refreshPayload = {
      sub: accessPayload.sub,
    };

    const accessToken = await this.jwtService.signAsync(accessPayload, this.accessConfiguration);
    const refreshToken = await this.jwtService.signAsync(refreshPayload, this.refreshConfiguration);

    await this.usersService.setRefreshToken(user.id, refreshToken)

    return { accessToken, refreshToken };
  }

  async refresh(user: User) {
    const accessPayload = {
      name: user.name,
      sub: user.id,
    };

    return {
      accessToken: await this.jwtService.signAsync(accessPayload, this.accessConfiguration),
    };
  }
}
