import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { logging } from 'protractor';
import { Authenticate } from 'src/app/Dtos/Users/Authenticate';
import { AuthenticationService } from 'src/app/Services/AuthenticationService';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  constructor(
    private authenticationService:AuthenticationService,
    private router:Router) { }

  ngOnInit(): void {
  }

  login()
  {
    if (!this.authenticationData.Email || !this.authenticationData.Password) 
      return
    this.authenticationService.Authenticate(this.authenticationData)
      .subscribe(account => this.router.navigate(['/']))
  }

  authenticationData:Authenticate = new Authenticate(null, null)
}
