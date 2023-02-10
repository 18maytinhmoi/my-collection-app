import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '@core/authentication/auth.service';
import { TokenDto } from '@core/models/dto';
import {
  BehaviorSubject,
  catchError,
  filter,
  finalize,
  Observable,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private _isRefreshing = false;
  private _token$ = new BehaviorSubject<TokenDto | null>(null);
  private _exceptions = ['/login', '/refresh-token'];

  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return this.authService.token$.pipe(
      switchMap(token => {
        if (token && !request.headers.has('Authorization')) {
          return this._addTokenToRequest(request, next, token.accessToken).pipe(
            catchError(error => {
              if (
                error instanceof HttpErrorResponse &&
                error.status === HttpStatusCode.Unauthorized &&
                this._exceptions.some(d => request.url.includes(d))
              ) {
                if (!token.refreshToken) {
                  return throwError(() => error);
                }
                return this._handle401Error(request, next, token.refreshToken, error);
              } else {
                return throwError(() => error);
              }
            })
          );
        }
        return next.handle(request);
      })
    );
  }

  private _handle401Error(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    refreshToken: string,
    error: HttpErrorResponse
  ) {
    if (this._isRefreshing) {
      this._isRefreshing = true;
      this._token$.next(null);
      return this.authService.refreshToken(refreshToken).pipe(
        take(1),
        tap({
          next: value => {
            this._token$.next(value);
          },
          error: err => {
            this._token$.next(err);
            this.authService.logout();
          },
        }),
        finalize(() => {
          this._isRefreshing = false;
        }),
        catchError((err: HttpErrorResponse) => throwError(() => error)),
        switchMap(value => this._addTokenToRequest(request, next, value.accessToken))
      );
    } else {
      return this._token$.pipe(
        filter(x => !!x),
        take(1),
        switchMap(value => this._addTokenToRequest(request, next, value!.accessToken))
      );
    }
  }

  private _addTokenToRequest(
    request: HttpRequest<unknown>,
    next: HttpHandler,
    accessToken: string
  ): Observable<HttpEvent<any>> {
    const headers = request.headers.set('Authorization', `Bearer ${accessToken}`);
    const reqClone = request.clone({ headers });

    return next.handle(reqClone);
  }
}
