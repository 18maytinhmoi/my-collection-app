import { ApiError } from '@core/models/api-error';
import { MonoTypeOperatorFunction, Observable, pipe, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function logErrorAndRethrow<TInput = any>(
  cb?: (err: ApiError) => void
): MonoTypeOperatorFunction<TInput> {
  return catchError((err: ApiError) => {
    // console.error(err);
    cb?.(err);
    return throwError(() => err);
  });
}

export function handleApiError<TReturn = any>(
  obsFactory: (err?: ApiError) => Observable<TReturn>
): MonoTypeOperatorFunction<TReturn> {
  return pipe(
    logErrorAndRethrow(),
    catchError(err => obsFactory(err))
  );
}
