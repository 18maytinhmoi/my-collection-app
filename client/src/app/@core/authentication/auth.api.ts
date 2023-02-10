import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SignInDto, SignUpDto, TokenDto } from '@core/models/dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthApi {
  baseUrl = environment.baseUrl + 'security/';
  endPoints = {
    register: () => 'register',
    login: () => 'login',
    refreshToken: () => 'refresh',
  };

  constructor(private readonly _http: HttpClient) {
    HttpParams;
  }

  signUp(dto: SignUpDto): Observable<TokenDto> {
    const url = this.baseUrl + this.endPoints.register();
    return this._http.post<TokenDto>(url, dto);
  }

  signIn(dto: SignInDto): Observable<TokenDto> {
    const url = this.baseUrl + this.endPoints.login();
    return this._http.post<TokenDto>(url, dto);
  }

  refreshToken(refreshToken: string): Observable<TokenDto> {
    const url = this.baseUrl + this.endPoints.refreshToken();
    const headers = new HttpHeaders();
    headers.set('Authorization', `Bearer ${refreshToken}`);
    return this._http.post<TokenDto>(url, null, { headers });
  }

  logout() {}
  // logout(): Observable<void> {
  //   const promise = signOut(this._auth);
  //   return defer(() => from(promise));
  // }
}
