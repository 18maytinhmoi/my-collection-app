import { ApiResponse, ApiResponseStatus } from '@core/models/api-response';
import { isObservable, Observable, of, throwError } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { handleApiError } from './handle-api-error';

export function handleApiResponse<T>(
  api$: Observable<T>,
  initialValue: T,
  errObsFactoryOrRethrow?: true | ((err: unknown) => unknown | Observable<unknown>)
): Observable<ApiResponse<T>> {
  return api$.pipe(
    map(data => ({ status: ApiResponseStatus.Success, data, error: '' })),
    startWith({
      status: ApiResponseStatus.Loading,
      data: initialValue,
      error: '',
    }),
    handleApiError(err => {
      const defaultFailureResponse = {
        status: ApiResponseStatus.Failure,
        data: initialValue,
      };

      if (errObsFactoryOrRethrow == null) {
        return of<ApiResponse<T>>({
          ...defaultFailureResponse,
          error: err?.message || err?.toString(),
        });
      }

      if (typeof errObsFactoryOrRethrow === 'function') {
        const error = errObsFactoryOrRethrow(err);
        if (isObservable(error)) {
          return error.pipe(
            map<unknown, ApiResponse<T>>(e => ({
              ...defaultFailureResponse,
              error: e,
            }))
          );
        }

        return of<ApiResponse<T>>({
          ...defaultFailureResponse,
          error,
        });
      }

      return throwError(() => new Error(err?.message));
    })
  );
}
