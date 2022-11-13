import {
  Observable,
  ReplaySubject,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
export class ResettableSubject<T> extends Subject<T> {
  private modifierSubj = new Subject<T>();
  private subscription: Subscription;
  private factoryResultSubj: Subject<T>;
  private factoryFn: () => Subject<T>;
  private value$: Observable<T>;

  constructor(factoryFn: () => Subject<T> = () => new ReplaySubject<T>(1)) {
    super();

    this.factoryFn = factoryFn;
    this.factoryResultSubj = this.factoryFn();
    this.subscription = this.modifierSubj.subscribe(this.factoryResultSubj);
    this.value$ = this.pipe(
      startWith(undefined),
      switchMap(() => this.factoryResultSubj)
    );
  }

  override asObservable(): Observable<T> {
    return this.value$;
  }

  reset(): void {
    this.subscription.unsubscribe();
    this.next(undefined as any as T);
    this.factoryResultSubj = this.factoryFn();
    this.subscription = this.modifierSubj.subscribe(this.factoryResultSubj);
  }

  override next(value: T): void {
    this.modifierSubj.next(value);
  }
}
