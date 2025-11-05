import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

/* global catch exceptions */

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const isHttp = exception instanceof HttpException;
    const status = isHttp ? (exception as HttpException).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = isHttp
      ? (exception as HttpException).getResponse()
      : 'Internal server error';

    const body = {
      statusCode: status,
      message,
      path: request.originalUrl || request.url,//add
      method: request.method,//add
      timestamp: new Date().toISOString(),//add
    };

    response.status(status).json(body);
  }
}
