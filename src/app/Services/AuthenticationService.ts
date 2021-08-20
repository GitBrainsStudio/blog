import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GTBRNS_BLOG_API } from "src/environments/environment";
import { Authenticate } from "../Dtos/Users/Authenticate";
import { Account } from "../Models/Account";


@Injectable({providedIn: "root"})
export class AuthenticationService
{
    private authenticatedAccountLocalStorageTitle = 'authenticated_account'
    private systemAccountSubject: BehaviorSubject<Account>;

    constructor(private http:HttpClient)
    {
        this.systemAccountSubject = new BehaviorSubject<Account>(JSON.parse(localStorage.getItem(this.authenticatedAccountLocalStorageTitle)));
    }

    public get AuthenticatedAccount(): Account {
        return this.systemAccountSubject.value;
    }

    
    Authenticate(authenticate:Authenticate) : Observable<Account>
    {
        return this.http.post(GTBRNS_BLOG_API + "users/authenticate", authenticate).pipe(map((account:Account) =>
        {
            if (account?.User && account?.Token)
            {
                localStorage.setItem(this.authenticatedAccountLocalStorageTitle, JSON.stringify(account));
                this.systemAccountSubject.next(account);  
            }

        return account;  
        }));
    }

    Logout() {
        localStorage.removeItem(this.authenticatedAccountLocalStorageTitle);
        this.systemAccountSubject.next(null);
    }
}