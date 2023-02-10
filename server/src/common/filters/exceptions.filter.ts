import { ApiException } from '@common/models/api-exception';
import { DriverException } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const statusCode = exception.getStatus();

      response.status(statusCode).json(
        new ApiException({
          statusCode: statusCode,
          message: exception.message,
          error: exception.message,
          path: request.path,
        })
      );
    } else if (exception instanceof DriverException) {
      const status = exception.code;

      console.log('status tesst', exception);

      response.status(500).json(
        new ApiException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: exception.errmsg ?? exception.message,
          error: exception.name ?? exception.message,
          path: request.path,
        })
      );
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(
        new ApiException({
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: (exception as any).message,
          error: (exception as any).message,
          path: request.path,
        })
      );
    }
  }
}
