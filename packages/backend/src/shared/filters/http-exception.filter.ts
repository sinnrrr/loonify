import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { DefaultResponse } from '../interfaces/default-response.interface';

interface ShouldHaveException {
  statusCode: number
  message: string[]
  error: string
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly configService: ConfigService) {
  }

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const res = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    const exceptionResponse = exception.getResponse() as ShouldHaveException;

    const responseInformation =
      typeof exceptionResponse === 'object'
        ? {
          message: exceptionResponse.error,
          errors: exceptionResponse.message,
        }
        : {
          message: [exceptionResponse],
        };

    res
      .status(statusCode)
      .json(<DefaultResponse<any>>{
        data: null,
        result: {
          statusCode,
          ...responseInformation,
        },
        meta: {
          apiVersion: this.configService.get('application.apiVersion'),
          appVersion: this.configService.get('application.appVersion'),
        },
      });
  }
}
