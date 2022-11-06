import { Injectable, NgZone } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserApi } from '@core/api/user.api';
import { Subscription, tap } from 'rxjs';

import { AuthState } from './auth.state';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public allowPaths = ['sign-in', 'sign-up'];
  private _getSubscription!: Subscription;
  constructor(
    private readonly _ngZone: NgZone,
    private readonly _router: Router,

    private readonly _auth: Auth,
    private readonly _authState: AuthState,
    private readonly _userApi: UserApi
  ) {
    onAuthStateChanged(this._auth, firebaseUser => {
      if (firebaseUser) {
        this._getSubscription = this._userApi
          .get(firebaseUser.uid)
          .pipe(
            tap(data => (this._authState.user = data)),
            tap(() =>
              this._ngZone.run(() => {
                this._router.navigate(['/']);
              })
            )
          )
          .subscribe();
      } else {
        const url = this._router.url;
        if (!this.allowPaths.some(path => url.includes(path))) {
          this.clear();
        }
      }
    });
  }

  clear() {
    this._getSubscription.unsubscribe();
    this._authState.reset();
    this._ngZone.run(() => {
      this._router.navigate(['sign-in']);
    });
  }
}
