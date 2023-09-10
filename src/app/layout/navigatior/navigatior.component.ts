import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponse } from 'src/models/authorization';
import { AuthorizationService } from 'src/services/authorization/authorization.service';

@Component({
  selector: 'app-navigatior',
  templateUrl: './navigatior.component.html',
  styleUrls: ['./navigatior.component.css']
})
export class NavigatiorComponent {
  public username: string = "";
  constructor (
    private readonly router: Router,
    private readonly _authorizationService: AuthorizationService
  ) {

  }
  ngOnInit() {
    var getLoginInfo = localStorage.getItem("auth_app_token");
    if(getLoginInfo != undefined)
    {
      
      var loginResponse = JSON.parse(getLoginInfo) as LoginResponse;
     this.username = loginResponse.userName;
     console.log(loginResponse);
    }
   
  }

  logout() {

    this._authorizationService.logout();
  }
}
