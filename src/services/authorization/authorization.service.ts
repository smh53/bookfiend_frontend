import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TOKEN_INFO_NAME } from 'src/app/constants/authorization/token';
import { environment } from 'src/environments/environment.development';
import { Claim, LoginRequest, LoginResponse } from 'src/models/authorization';

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

  checkClaims(claimType: string, claimValue: string): boolean 
  {
    var loginResponse = JSON.parse(localStorage.getItem(TOKEN_INFO_NAME)!) as LoginResponse
    const jwtToken = JSON.parse(atob(loginResponse.token.split('.')[1]));  
    var check = false;
    if(jwtToken[claimType] != undefined)    
    {
      jwtToken[claimType].forEach((cv: string) => {
        if(cv == claimValue)
          check = true;
      });
     return check;
    }
          
    return false;
  }

   getClaims () {
    return this._httpClient.get<Claim[]>(`${environment.authorizationUrl}/claims`);
  }
}
