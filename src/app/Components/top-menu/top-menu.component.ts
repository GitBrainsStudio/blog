import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Services/AuthenticationService';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  constructor(public authentcationService:AuthenticationService) { }

  ngOnInit(): void {
  }


}
