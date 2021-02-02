import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TOKEN_AUTH_GUARD } from '../../constants';

@Injectable()
export class TokenAuthGuard extends AuthGuard(TOKEN_AUTH_GUARD) {}
