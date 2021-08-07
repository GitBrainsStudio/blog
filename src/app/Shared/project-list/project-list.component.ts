import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from 'src/app/Models/project';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(this.data)
  }

  @Input() data : Observable<Project[]>

/*   @Input() data : Observable<ProjectRow[]> */


}



