import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

import { AuthenticationService } from '../Services/AuthenticationService';
import { GTBRNS_BLOG_API } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const currentUser = this.authenticationService?.AuthenticatedAccount;
        const isLoggedIn = currentUser?.User;
        const isApiUrl = request.url.startsWith(GTBRNS_BLOG_API);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({ headers: request.headers.set('Authorization', `${currentUser.Token}`) });
        }

        return next.handle(request)
            .pipe(
                map((event: HttpEvent<any>) => {
                    if (event instanceof HttpResponse) {
    
                      
                    }
                    return event;
                }),
                
                catchError((error: HttpErrorResponse) => {
    
                
                    if ([401, 403].indexOf(error.status) !== -1) {
                        
                        this.authenticationService.Logout()
                    }
                    
                    return throwError(error);
                }));
    }
}