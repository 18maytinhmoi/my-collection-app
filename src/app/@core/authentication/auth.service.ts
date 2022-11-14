import { Injectable, NgZone, OnDestroy } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserApi } from '@core/api/user.api';
import { ReplaySubject, takeUntil, tap } from 'rxjs';

import { AuthState } from './auth.state';
@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // public allowPaths = ['sign-in', 'sign-up'];
  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private readonly _ngZone: NgZone,
    private readonly _router: Router,
    private readonly _auth: Auth,
    private readonly _authState: AuthState,
    private readonly _userApi: UserApi
  ) {
    onAuthStateChanged(this._auth, firebaseUser => {
      if (firebaseUser) {
        this._userApi
          .get(firebaseUser.uid)
          .pipe(
            tap(data => (this._authState.user = data)),
            // tap(() =>
            //   this._ngZone.run(() => {
            //     this._router.navigate(['/']);
            //   })
            // ),
            takeUntil(this._destroy)
          )
          .subscribe();
      } else {
        this._authState.reset();
      }
    });
  }

  ngOnDestroy() {
    this._destroy.next(null);
  }
}
