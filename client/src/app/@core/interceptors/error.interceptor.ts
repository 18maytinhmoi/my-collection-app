import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry, timer } from 'rxjs';

export const MAX_RETRIES_TIMES = 2;
export const DELAY_TIME_MS = 500;

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      retry({
        count: MAX_RETRIES_TIMES,
        delay: error => {
          if (error.status >= 500) {
            return timer(MAX_RETRIES_TIMES);
          }
          throw error;
        },
      })
    );
  }
}
