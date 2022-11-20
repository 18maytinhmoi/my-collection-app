import { merge, Observable, scan } from 'rxjs';

export type MutationFn<T> = (value: T) => T;

export abstract class BaseComponent<TViewModel> {
  vm$!: Observable<TViewModel>;

  protected initialize(
    sources: Observable<MutationFn<TViewModel>>[],
    initialValue: TViewModel
  ) {
    this.vm$ = merge(...sources).pipe(
      scan(
        (vm: TViewModel, mutationFn: MutationFn<TViewModel>) => mutationFn(vm),
        initialValue
      )
    );
  }
}
