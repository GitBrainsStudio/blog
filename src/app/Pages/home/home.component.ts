import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostPreviewHttp } from 'src/app/Models/http-models/post-preview.http';
import { OpacityAnimation } from 'src/app/Models/opacity-animation';
import { Post } from 'src/app/Models/post_';
import { Project } from 'src/app/Models/project';
import { PostService } from 'src/app/Services/PostService';
import { ProjectService } from 'src/app/Services/ProjectService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [ OpacityAnimation ]
})
export class HomeComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private postService: PostService) { }

  ngOnInit(): void {
/*     this.projectRows$ = this.dataService.projectColumns();
    this.postPreviews$ = this.dataService.postPreviews();
 */
    this.projectRows$ = this.projectService.GetAll()
    this.posts$ = this.postService.GetAll()
  }

/*   postPreviews$ : Observable<PostPreviewHttp[]>
  projectRows$ : Observable<ProjectRow[]>
 */
  projectRows$ : Observable<Project[]>
  posts$ : Observable<Post[]>
}
