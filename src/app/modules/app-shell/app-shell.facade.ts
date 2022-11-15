import { Injectable } from '@angular/core';
import { AuthApi } from '@core/authentication/auth.api';
import { switchMap } from 'rxjs';
import { CollectionApi } from './services/collection.api';

import { AuthState } from '@core/authentication/auth.state';

@Injectable()
export class AppShellFacade {
  constructor(
    private readonly _authApi: AuthApi,
    private readonly _collectionApi: CollectionApi,
    private readonly _authState: AuthState
  ) {}

  userProfile() {
    return this._authState.user$;
  }

  getCollections() {
    return this._authState.user$.pipe(
      switchMap(user => this._collectionApi.getAll(user.id))
    );
  }

  logout() {
    return this._authApi.logout();
  }
}
