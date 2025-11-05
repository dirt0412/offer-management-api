import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/* simple log for every request */

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const { method, originalUrl } = req;

    res.on('finish', () => {
      const ms = Date.now() - start;
      const status = res.statusCode;
      // Simple one-line log
      // Example: GET /offers 200 12ms
      // You can swap console.log for proper logger later
      console.log(`${method} ${originalUrl} ${status} ${ms}ms`);
    });

    next();
  }
}
