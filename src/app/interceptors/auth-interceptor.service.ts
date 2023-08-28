import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginResponse } from 'src/models/authorization';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.

    var token;
    var loginResponse = JSON.parse(localStorage.getItem("auth_app_token")!) as LoginResponse
    console.log(loginResponse)
    
    if(loginResponse != null)
      token = loginResponse.token
    const contentType = 'application/json'

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    const authReq = req.clone({
      // headers: req.headers.set('Authorization', authToken)
      setHeaders : { 'Content-Type': contentType, 'Authorization': 'Bearer ' + token }
    });
    
    // send cloned request with header to the next handler.
    console.log(authReq);
    return next.handle(authReq);
  }
}
