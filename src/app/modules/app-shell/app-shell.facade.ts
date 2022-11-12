import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '@core/authentication/auth.api';
import { mergeMap, of } from 'rxjs';
import { CollectionApi } from './services/collection.api';

import { UserApi } from '@core/api/user.api';
import { AuthService } from '@core/authentication/auth.service';
import { AuthState } from '@core/authentication/auth.state';

@Injectable()
export class AppShellFacade {
  constructor(
    private readonly _ngZone: NgZone,
    private readonly _router: Router,
    private readonly _authApi: AuthApi,
    private readonly _collectionApi: CollectionApi,
    private readonly _authService: AuthService,
    private readonly _authState: AuthState,
    private readonly _userApi: UserApi
  ) {}

  userProfile() {
    return this._authState.user$;
  }

  getCollections() {
    return this._authState.user$.pipe(
      mergeMap(user => {
        if (user) {
          return this._collectionApi.getAll(user.id);
        }
        return of([]);
      })
    );
  }

  logout() {
    return this._authApi.logout();
  }
}
