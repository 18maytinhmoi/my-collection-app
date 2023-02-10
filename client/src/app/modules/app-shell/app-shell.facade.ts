import { Injectable } from '@angular/core';
import { AuthApi } from '@core/authentication/auth.api';
import { CollectionApi } from './services/collection.api';

@Injectable()
export class AppShellFacade {
  constructor(
    private readonly _authApi: AuthApi,
    private readonly _collectionApi: CollectionApi // private readonly _: AuthState
  ) {}

  // userProfile() {
  //   return this._authState.user$;
  // }

  // getCollections() {
  //   return this._authState.user$.pipe(
  //     switchMap(user => this._collectionApi.getAll(user.id))
  //   );
  // }

  logout() {
    return this._authApi.logout();
  }
}
