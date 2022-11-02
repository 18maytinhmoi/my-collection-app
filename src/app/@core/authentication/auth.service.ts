import { Injectable, NgZone } from '@angular/core';
import { Auth, onAuthStateChanged } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

import { AuthApi } from './auth.api';
import { AuthState } from './auth.state';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly auth: Auth,
    private readonly authState: AuthState,
    private readonly authApi: AuthApi
  ) {
    onAuthStateChanged(this.auth, firebaseUser => {
      if (firebaseUser) {
        this.authApi.getUserProfile(firebaseUser.uid).pipe(
          tap(data => (this.authState.user = data)),
          tap(() =>
            this.ngZone.run(() => {
              this.router.navigate(['overview']);
            })
          )
        );
      } else {
        this.clear();
      }
    });
  }

  clear() {
    this.authState.reset();
    this.ngZone.run(() => {
      this.router.navigate(['sign-in']);
    });
  }
}
