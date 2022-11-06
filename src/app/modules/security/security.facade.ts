import { Injectable, NgZone } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';
import { AuthApi } from '@core/authentication/auth.api';
import { AuthState } from '@core/authentication/auth.state';
import { SignInForm } from './models/sign-in.form';
import { SignUpForm } from './models/sign-up.form';

import { UserEntity } from '@core/models/entities/user.entity';
import { handleApiResponse } from '@core/utils/rx/handle-api-response';

import { UserApi } from '@core/api/user.api';
import { ApiResponse } from '@core/models/api-response';
import { CreateUserDto } from '@core/models/dto/user.dto';
import { AuthErrorMessages } from '@core/models/firebase-auth-error';
import { getAuthErrorMessage } from '@core/utils/firebase/auth-error-message';
import { map, mergeMap, Observable, pipe, tap } from 'rxjs';

@Injectable()
export class SecurityFacade {
  constructor(
    private readonly _ngZone: NgZone,
    private readonly _router: Router,
    private readonly _authApi: AuthApi,
    private readonly _authState: AuthState,
    private readonly _userApi: UserApi
  ) {}

  signIn(dto: SignInForm): Observable<ApiResponse<UserEntity | null>> {
    const apiCall$ = this._authApi.signIn(dto.email, dto.password).pipe(
      map(data => data.user.uid),
      mergeMap(uid => this._userApi.get(uid)),
      this._handleAfterAuthentication()
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

  signUp(dto: SignUpForm): Observable<ApiResponse<UserEntity | null>> {
    const userDto: CreateUserDto = {
      email: dto.email,
      firstName: dto.firstName,
      lastName: dto.lastName,
    };

    const apiCall$ = this._authApi
      .signUpWithEmail(dto.email, dto.password)
      .pipe(
        map(data => data.user.uid),
        mergeMap(uid => this._userApi.create(uid, userDto)),
        this._handleAfterAuthentication()
      );

    return handleApiResponse(apiCall$, null, err => {
      const error = err as FirebaseError;
      return error.message;
    });
  }

  // 2. create user data
  // 3. save user data in local storage
  // 4. change state
  private _handleAfterAuthentication() {
    return pipe(
      tap<UserEntity>(data => {
        this._authState.user = data;
        this._ngZone.run(() => {
          this._router.navigate(['']);
        });
      })
    );
  }
}
