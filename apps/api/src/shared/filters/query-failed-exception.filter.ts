import { QueryFailedError } from 'typeorm';
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { DefaultResponse } from '../interfaces/default-response.interface';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { getReasonPhrase } from 'http-status-codes';

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {
  }

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const statusCode: number = HttpStatus.UNPROCESSABLE_ENTITY;

    res
      .status(statusCode)
      .json(<DefaultResponse<any>>{
        data: null,
        result: {
          statusCode,
          message: getReasonPhrase(statusCode),
          errors: [exception.message],
        },
        meta: {
          apiVersion: this.configService.get('application.apiVersion'),
          appVersion: this.configService.get('application.appVersion'),
        },
      });
  }
}
