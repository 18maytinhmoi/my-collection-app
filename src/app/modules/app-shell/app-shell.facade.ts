import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthApi } from '@core/authentication/auth.api';

import { UserApi } from '@core/api/user.api';
import { AuthService } from '@core/authentication/auth.service';

@Injectable()
export class AppShellFacade {
  constructor(
    private readonly _ngZone: NgZone,
    private readonly _router: Router,
    private readonly _authApi: AuthApi,
    private readonly _authService: AuthService,
    private readonly _userApi: UserApi
  ) {}

  logout() {
    return this._authApi.logout();
  }
}
