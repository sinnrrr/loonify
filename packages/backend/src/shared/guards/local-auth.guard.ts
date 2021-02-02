import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LOCAL_AUTH_GUARD } from '../../constants';

@Injectable()
export class LocalAuthGuard extends AuthGuard(LOCAL_AUTH_GUARD) {}
