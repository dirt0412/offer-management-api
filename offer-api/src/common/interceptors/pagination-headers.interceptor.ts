import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

/* add pagination headers (GET all) to response: X-Page etc. */

@Injectable()
export class PaginationHeadersInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse();
    return next.handle().pipe(
      tap((data) => {
        if (data && typeof data === 'object' && 'items' in data && 'total' in data) {
          const total = data.total ?? 0;
          const page = data.page ?? 1;
          const limit = data.limit ?? (data.items?.length ?? 0);
          const pages = data.pages ?? (limit ? Math.ceil(total / limit) : 1);

          res.setHeader('X-Total-Count', String(total));
          res.setHeader('X-Page', String(page));
          res.setHeader('X-Limit', String(limit));
          res.setHeader('X-Pages', String(pages));
        }
      }),
    );
  }
}
