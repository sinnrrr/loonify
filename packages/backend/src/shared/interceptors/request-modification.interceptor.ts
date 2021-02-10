import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RequestModificationInterceptor implements NestInterceptor {
  private readonly toFieldBodyKey: string;
  private readonly toFieldRequestKey: string;
  private readonly fromBodyKey: string;
  private readonly fromRequestKey: string;

  constructor(
    toFieldBodyKey = 'owner',
    toFieldRequestKey = 'body',
    fromBodyKey = 'id',
    fromRequestKey = 'user'
  ) {
    this.toFieldBodyKey = toFieldBodyKey
    this.toFieldRequestKey = toFieldRequestKey
    this.fromBodyKey = fromBodyKey
    this.fromRequestKey = fromRequestKey
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    request[this.toFieldRequestKey][this.toFieldBodyKey] = request[this.fromRequestKey][this.fromBodyKey]

    return next.handle();
  }
}
