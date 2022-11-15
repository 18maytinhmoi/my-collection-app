import { MonoTypeOperatorFunction, pipe, tap } from 'rxjs';

export function checkIfDataNull<T>(message: string): MonoTypeOperatorFunction<T> {
  return pipe(
    tap(data => {
      if (!data) {
        throw new Error(message);
      }
    })
  );
}
