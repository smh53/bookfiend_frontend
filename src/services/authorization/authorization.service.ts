import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_INFO_NAME } from 'src/app/constants/token';
import { environment } from 'src/environments/environment.development';
import { LoginRequest, LoginResponse } from 'src/models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(
    private _httpClient: HttpClient,
    private router: Router
  ) { }



  login(loginRequest: LoginRequest) {
    return this._httpClient.post<LoginResponse>(`${environment.authorizationUrl}/login`, loginRequest);
  }
  logout()
  {
    localStorage.removeItem(TOKEN_INFO_NAME);
    this.router.navigateByUrl('/authorization/login');
  }
}
