import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPreviewHttp } from 'src/app/Models/http-models/post-preview.http';
import { OpacityAnimation } from 'src/app/Models/opacity-animation';
import { Project } from 'src/app/Models/project';
import { ProjectService } from 'src/app/Services/ProjectService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ OpacityAnimation ]
})
export class HomeComponent implements OnInit {

  constructor(
    private projectService: ProjectService) { }

  ngOnInit(): void {
/*     this.projectRows$ = this.dataService.projectColumns();
    this.postPreviews$ = this.dataService.postPreviews();
 */
    this.projectRows$ = this.projectService.GetAll()
  }

/*   postPreviews$ : Observable<PostPreviewHttp[]>
  projectRows$ : Observable<ProjectRow[]>
 */
  projectRows$ : Observable<Project[]>
}
