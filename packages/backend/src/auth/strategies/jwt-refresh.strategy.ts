import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { JWT_REFRESH_STRATEGY } from '../../constants';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, JWT_REFRESH_STRATEGY) {
  constructor(
    configService: ConfigService,
    protected usersService: UsersService,
  ) {
    super({
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: configService.get('jwt.refresh.secret'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(req: any, payload: any) {
    // const validated = await this.usersService.verifyArgonHash(
    //   { where: { id: payload.sub } },
    //   req.token,
    //   'refreshToken',
    // );
    //
    // if (!validated) throw new UnauthorizedException('Refresh token doesn\'t seem to be valid');

    return { sub: payload.sub };
  }
}
