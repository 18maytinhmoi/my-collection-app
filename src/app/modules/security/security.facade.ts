import { Injectable, NgZone } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { AuthApi } from '@core/authentication/auth.api';
import { AuthState } from '@core/authentication/auth.state';
import { SignInForm } from './models/sign-in.form';

import { UserEntity } from '@core/models/user.entity';
import { LocalStorageService } from '@core/services/local-storage.service';
import { handleApiResponse } from '@core/utils/rx/handle-api-response';

import { ApiResponse } from '@core/models/api-response';
import { AuthErrorMessages } from '@core/models/firebase-auth-error';
import { getAuthErrorMessage } from '@core/utils/firebase/auth-error-message';
import { map, mergeMap, Observable, pipe, tap } from 'rxjs';

@Injectable()
export class SecurityFacade {
  constructor(
    private readonly ngZone: NgZone,
    private readonly router: Router,
    private readonly authApi: AuthApi,
    private readonly authState: AuthState,
    private readonly localStorageService: LocalStorageService
  ) {}

  signIn(dto: SignInForm): Observable<ApiResponse<UserEntity | null>> {
    const apiCall$ = this.authApi.signIn(dto.emailAddress, dto.password).pipe(
      map(data => data.user.uid),
      mergeMap(uid => this.authApi.getUserProfile(uid)),
      this.handleAfterAuthentication()
    );

    const cases: AuthErrorMessages = {
      USER_DELETED: 'Tài khoản không tồn tại',
      INVALID_PASSWORD: 'Mật khẩu không đúng',
      INVALID_EMAIL: 'Email hoặc mật khẩu không đúng',
    };

    return handleApiResponse(apiCall$, null, err => {
      const error = err as FirebaseError;
      return getAuthErrorMessage(error, cases);
    });
  }

  // signUp(dto: SignUpDto): Observable<UserDto> {
  //   const entity: UserEntity = {
  //     emailAddress: dto.emailAddress,
  //     firstName: dto.firstName,
  //     lastName: dto.lastName,
  //   };

  //   return this.authApi.signUpWithEmail(dto.emailAddress, dto.password).pipe(
  //     map(data => data.user.uid),
  //     mergeMap(uid => this.authApi.createUserProfile(uid, entity)),
  //     this.handleAfterAuthentication()
  //   );
  // }

  // 2. create user data
  // 3. save user data in local storage
  // 4. change state
  private handleAfterAuthentication() {
    return pipe(
      tap<UserEntity>(data => {
        this.authState.user = data;
        this.ngZone.run(() => {
          this.router.navigate(['overview']);
        });
      })
    );
  }
}
