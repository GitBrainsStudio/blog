import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostPreviewHttp } from 'src/app/Models/http-models/post-preview.http';
import { Post } from 'src/app/Models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  /* isLoad:boolean;
  pathToFile:string;
  paramId: string;

  constructor(private activatedRoute:ActivatedRoute, private router:Router, private mdDataService : MdDataService) { 
    this.paramId = this.activatedRoute.snapshot.params['md'];
    this.routeDetection(this.paramId);
  }

  ngOnInit(): void {
    
    this.postPreviews$ = this.mdDataService.postPreviews().pipe(map((v:PostPreviewHttp[]) => this.postPreviewHttpWithoutSelected(v)));
  
  }

  postPreviews$ : Observable<PostPreviewHttp[]>

  routeDetection(mdParam)
  {
    if (mdParam != undefined) this.pathToFile = 'assets/mds/' + mdParam + '.md'; 
    else this.onError();
  }

  onLoad()
  {
    this.isLoad = true;
  }

  onError()
  {
    this.router.navigate(['/']);
  }

  private postPreviewHttpWithoutSelected(array: PostPreviewHttp[]) : PostPreviewHttp[]
  {
    array.forEach((v, index) => 
      {
        let filteredArray = v.posts.filter(v => v.id != this.paramId);

        if (filteredArray.length > 0) { 
          v.posts = filteredArray;
        }

        else
        {
          array.splice(index);
        }

      });

    return array;
  }
   */
  
}
