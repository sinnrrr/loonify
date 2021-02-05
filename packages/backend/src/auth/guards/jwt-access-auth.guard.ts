import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_ACCESS_STRATEGY } from '../../constants';

@Injectable()
export class JwtAccessAuthGuard extends AuthGuard(JWT_ACCESS_STRATEGY) {}
