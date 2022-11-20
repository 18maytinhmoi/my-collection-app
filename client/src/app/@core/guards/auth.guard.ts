import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { AuthState } from '@core/authentication/auth.state';
import { Observable, skip, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private readonly _router: Router, private readonly _authState: AuthState) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable<boolean>((subscriber: Subscriber<boolean>) => {
      this._authState.loggedIn$.pipe(skip(1)).subscribe(loggedIn => {
        if (loggedIn) {
          // this._loadingFacade.setLoading(false);
          subscriber.next(true);
          subscriber.complete();
        } else {
          this._router.navigate(['sign-in']);
          // this._loadingFacade.setLoading(false);
          subscriber.next(false);
          subscriber.complete();
        }
      });
    });

    // return this.authState.loggedIn$;
  }
}
