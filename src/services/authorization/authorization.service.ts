import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { LoginRequest, LoginResponse } from 'src/models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private _httpClient: HttpClient,
  ) { }


  login(loginRequest: LoginRequest) {
    return this._httpClient.post<LoginResponse>(`${environment.authorizationUrl}/login`, loginRequest);
  }
}
