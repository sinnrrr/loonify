import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DefaultResponse } from '../interfaces/default-response.interface';
import { getReasonPhrase } from 'http-status-codes';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, DefaultResponse<T>> {

  constructor(private readonly configService: ConfigService) {
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<DefaultResponse<T>> {
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next
      .handle()
      .pipe(
        map(data => ({
          data: data.items || data || null,
          result: {
            statusCode: statusCode,
            message: getReasonPhrase(statusCode),
          },
          meta: {
            apiVersion:
              this.configService.get('npm_package_version')
              || this.configService.get('application.api.version'),
            appVersion: this.configService.get('application.app.version'),
            ...(data.pagination && { pagination: data.pagination})
          },
          ...(data.links && { links: data.links})
        })),
      );
  }
}
