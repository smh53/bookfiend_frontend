import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import { ErrorDialog } from '../constants/notifications/sw2-dialog';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/services/authorization/authorization.service';

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
   private readonly _authorizationService: AuthorizationService
  ) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request)
           .pipe(
                 catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                       console.log('This is client side error');
                       errorMsg = `Error: ${error.error.message}`;
                    } else {
                       console.log('This is server side error');
                       if(error.status == HttpStatusCode.Forbidden)
                       {
                        ErrorDialog.fire({
                          title: 'UNAUTHORIZED',
                          text: 'You are not authorized for this operation',
                           
                        })
                       }
                       if(error.status == HttpStatusCode.Unauthorized)
                       {
                        
                       this._authorizationService.logout();
                       }
                       errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    console.log(errorMsg);
                    return throwError(errorMsg);
                 })
           )
  }
}
