import { Injectable } from '@angular/core';
import { UserEntity } from '@core/models/entities/user.entity';
import { ResettableSubject } from '@core/utils/rx/resettable-subject';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthState {
  private readonly _userSubject: ResettableSubject<UserEntity>;
  private readonly _loggedInSubject: BehaviorSubject<boolean>;
  constructor() {
    this._userSubject = new ResettableSubject<UserEntity>();
    this._loggedInSubject = new BehaviorSubject<boolean>(false);
  }

  get user$() {
    return this._userSubject.asObservable();
  }

  set user(user: UserEntity) {
    this._userSubject.next(user);
    this._loggedInSubject.next(true);
  }

  get loggedIn$() {
    return this._loggedInSubject.asObservable();
  }

  reset() {
    this._userSubject.reset();
    this._loggedInSubject.next(false);
  }
}
