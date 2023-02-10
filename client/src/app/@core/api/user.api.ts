import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserDto } from '@core/models/dto';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'Application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class UserApi {
  baseUrl = environment.baseUrl + '/user';
  endPoints = {
    getUserProfile: (id: string) => `/${id}`,
  };
  constructor(private readonly _http: HttpClient) {}

  getUserProfile(id: string): Observable<UserDto> {
    const url = this.baseUrl + this.endPoints.getUserProfile(id);
    return this._http.get<UserDto>(url);
  }
}
