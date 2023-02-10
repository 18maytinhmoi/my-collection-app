import { BehaviorSubject, Observable } from 'rxjs';

export abstract class Store<T> {
  protected _state$: Observable<T>;
  protected _stateSubject$: BehaviorSubject<T>;

  protected constructor(initialState: T) {
    this._stateSubject$ = new BehaviorSubject(initialState);
    this._state$ = this._stateSubject$.asObservable();
  }

  get currentState(): T {
    return this._stateSubject$.getValue();
  }

  setState(nextState: T): void {
    this._stateSubject$.next(nextState);
  }
}
