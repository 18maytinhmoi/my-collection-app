import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { UserApi } from '@core/api/user.api';
import { AuthApi } from '@core/authentication/auth.api';
import { AuthService } from '@core/authentication/auth.service';
import { ApiResponse } from '@core/models/api-response';
import { UserDto } from '@core/models/dto';
import { handleApiResponse } from '@core/utils/rx/handle-api-response';
import { map, Observable } from 'rxjs';
import { SignInForm } from './models/sign-in.form';

@Injectable()
export class SecurityFacade {
  constructor(
    private readonly _ngZone: NgZone,
    private readonly _router: Router,
    private readonly _authApi: AuthApi,
    private readonly authService: AuthService,
    // private readonly _authState: AuthState,
    private readonly _userApi: UserApi
  ) {}

  signIn(dto: SignInForm) {
    const apiCall$ = this.authService.login(dto).pipe();

    const cases: AuthErrorMessages = {
      USER_DELETED: 'Tài khoản không tồn tại',
      INVALID_PASSWORD: 'Mật khẩu không đúng',
      INVALID_EMAIL: 'Email hoặc mật khẩu không đúng',
    };

    return handleApiResponse(apiCall$, null);
  }

  // signUp(dto: SignUpForm): Observable<ApiResponse<UserEntity | null>> {
  //   const userDto: CreateUserDto = {
  //     email: dto.email,
  //     firstName: dto.firstName,
  //     lastName: dto.lastName,
  //   };

  //   const apiCall$ = this._authApi.signUpWithEmail(dto.email, dto.password).pipe(
  //     map(data => data.user.uid),
  //     mergeMap(uid => this._userApi.create(uid, userDto)),
  //     this._handleAfterAuthentication()
  //   );

  //   return handleApiResponse(apiCall$, null);
  // }

  // signUp(dto: SignUpForm): Observable<ApiResponse<TokenDto>> {
  //   const apiCall$ = this._authApi.signUp(dto);
  // }

  // 2. create user data
  // 3. save user data in local storage
  // 4. change state
  // private _handleAfterAuthentication() {
  //   return pipe(
  //     tap<UserEntity>(data => {
  //       this._authState.user = data;
  //       this._ngZone.run(() => {
  //         this._router.navigate(['']);
  //       });
  //     })
  //   );
  // }
}
