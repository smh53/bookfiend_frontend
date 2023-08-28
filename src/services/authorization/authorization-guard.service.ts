import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, tap, of } from 'rxjs';
import { LoginResponse } from 'src/models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationGuardService {

  constructor(
    private router: Router,
    

    
    ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    
    if(this.checkLogin())
    {
      return true;
    }
    this.router.navigate(['authorization/login']) 
    return this.checkLogin();
  }

  checkLogin(): boolean {
    
    
      var getLoginInfo = localStorage.getItem("auth_app_token");
      if(getLoginInfo != undefined)
      {
        var loginResponse = JSON.parse(getLoginInfo) as LoginResponse;
        console.log(loginResponse);
        return true; 
      }
     
      return false; 
    
  }
}
