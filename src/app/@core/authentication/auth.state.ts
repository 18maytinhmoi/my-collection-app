import { Injectable } from '@angular/core';
import { UserEntity } from '@core/models/user.entity';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthState {
  private readonly _userSubject: BehaviorSubject<UserEntity | null>;
  private readonly _loggedInSubject: BehaviorSubject<boolean>;
  constructor() {
    this._userSubject = new BehaviorSubject<UserEntity | null>(null);
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
    this._userSubject.next(null);
    this._loggedInSubject.next(false);
  }
}
