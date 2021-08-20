import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../Services/AuthenticationService';
import { GTBRNS_BLOG_API } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const currentUser = this.authenticationService?.AuthenticatedAccount;
        const isLoggedIn = currentUser?.User;
        const isApiUrl = request.url.startsWith(GTBRNS_BLOG_API);

        if (isLoggedIn && isApiUrl) {
            request = request.clone({ headers: request.headers.set('Authorization', `Bearer ${currentUser.Token}`) });
        }

        return next.handle(request);
    }
}