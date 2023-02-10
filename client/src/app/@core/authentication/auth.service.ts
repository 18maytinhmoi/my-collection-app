import { Injectable, OnDestroy } from '@angular/core';
import { SignInDto, TokenDto } from '@core/models/dto';
import { LocalStorageService } from '@core/services/local-storage.service';
import { StorageKeys } from '@shared/constants/storage-keys';
import { EMPTY, ReplaySubject, tap } from 'rxjs';
import { AuthApi } from './auth.api';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // public allowPaths = ['sign-in', 'sign-up'];
  private _destroy: ReplaySubject<any> = new ReplaySubject<any>(1);

  constructor(
    private readonly storageService: LocalStorageService,
    private readonly authStore: AuthStore,
    private readonly authApi: AuthApi
  ) {}

  get token$() {
    return this.authStore.token$;
  }

  get loggedIn$() {
    return this.authStore.loggedIn$;
  }

  init() {
    const token = this.storageService.getObject<TokenDto>(StorageKeys.token);
    this.authStore.setState(token);
  }

  login(dto: SignInDto) {
    return this.authApi.signIn(dto).pipe(
      tap(token => this.authStore.setState(token)),
      tap(token => this.storageService.setObject(StorageKeys.token, token))
    );
  }

  refreshToken(refreshToken: string) {
    return this.authApi
      .refreshToken(refreshToken)
      .pipe(tap(token => this.authStore.setState(token)));
  }

  logout() {
    this.storageService.remove(StorageKeys.token);
    this.authStore.setState(null);
    return EMPTY;
  }

  ngOnDestroy() {
    this._destroy.next(null);
  }
}
