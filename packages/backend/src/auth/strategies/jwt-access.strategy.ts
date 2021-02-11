import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from "../../users/users.service";
import { JWT_ACCESS_STRATEGY } from '../../constants';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, JWT_ACCESS_STRATEGY) {
  constructor(
    configService: ConfigService,
    protected usersService: UsersService,
  ) {
    super({
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.access.secret'),
    });
  }

  async validate(payload: any) {
    return this.usersService.findOne({ where: { id: payload.sub } });
  }
}
