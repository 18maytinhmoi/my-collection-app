import { Injectable } from '@angular/core';
import { TokenDto } from '@core/models/dto';
import { Store } from '@core/services/store';

import { map } from 'rxjs';

// type AuthState = {
//   token: TokenDto | null;
//   loggedIn: boolean;
// };

// const initial: AuthState = { token: null, loggedIn: false };

@Injectable({ providedIn: 'root' })
export class AuthStore extends Store<TokenDto | null> {
  constructor() {
    super(null);
  }

  get loggedIn$() {
    return this._state$.pipe(map(token => (token ? true : false)));
  }

  get token$() {
    return this._state$;
  }

  reset() {
    this._stateSubject$.next(null);
  }
}
