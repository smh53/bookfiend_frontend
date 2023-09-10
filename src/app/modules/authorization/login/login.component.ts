import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { propertyOf } from 'lodash';
import { ErrorDialog } from 'src/app/constants/notifications/sw2-dialog';
import { TOKEN_INFO_NAME } from 'src/app/constants/authorization/token';
import { LoginRequest, LoginResponse } from 'src/models/authorization';
import { AuthorizationService } from 'src/services/authorization/authorization.service';
import '@microsoft/signalr';

import { environment } from 'src/environments/environment.development';
import { Author } from 'src/models/author';
import { Toast } from 'src/app/constants/notifications/sw2-toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
    submitted!: boolean;
    hide = true;
    public loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],  
      password: ['', Validators.required],

    });

    constructor(
      private readonly _authorizationService: AuthorizationService,
      private readonly router: Router,
      private _formBuilder: FormBuilder,
     
    ) {

    }
    get f() { return this.loginForm.controls; }


  login() {

   
    this.submitted = true;
    if (this.loginForm.invalid) 
    {
      ErrorDialog.fire({
        title: 'Validation Error',
        text: 'Validation errors. Fix them.'
      });

    }
    let loginRequest = <any>{};
    loginRequest = Object.assign({}, this.loginForm.value);

    this._authorizationService.login(loginRequest).subscribe({
      
      next: (v) => {
        console.log(v);
        if(v != undefined)
        {
          var value = JSON.stringify(v);
          localStorage.setItem("auth_app_token",value);
          this.router.navigateByUrl("/layout");
        }
      },
      error: (e) => {
        this.submitted = false;
        this.loginForm.reset();
        Toast.fire({
          title: 'Error',
          icon: 'error',
          text: 'Invalid credentials'
        })
       

      },
      complete: () => {
        var loginResponse = JSON.parse(localStorage.getItem(TOKEN_INFO_NAME)!) as LoginResponse
        const jwtToken = JSON.parse(atob(loginResponse.token.split('.')[1]));
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now();

       

        

        setTimeout(() => this._authorizationService.logout(), timeout);
      }
    })
  }
}
