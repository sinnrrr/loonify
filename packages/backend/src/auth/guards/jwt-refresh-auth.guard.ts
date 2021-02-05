import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_REFRESH_STRATEGY } from '../../constants';

@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard(JWT_REFRESH_STRATEGY) {}
