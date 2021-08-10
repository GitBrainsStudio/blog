import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { PostPreviewHttp } from 'src/app/Models/http-models/post-preview.http';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/PostService';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  

  
  constructor(
    private activatedRoute:ActivatedRoute, 
    private router:Router, 
    private postService:PostService
    ) { 
    this.postIdFromRouteParams = this.activatedRoute.snapshot.params['id'];

    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => this.rootRoute(this.activatedRoute)),
      filter((route: ActivatedRoute) => route.outlet === 'primary'),
    ).subscribe((route: ActivatedRoute) => {

      this.postIdFromRouteParams = route.snapshot.paramMap.get('id');
    });
  }

  private rootRoute(route: ActivatedRoute): ActivatedRoute {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route;
  }


  ngOnInit(): void {
    
    this.postService.GetById(this.postIdFromRouteParams)
    
    .subscribe(post => { this.post = post;})

  }

  postIdFromRouteParams: string;
  post:Post
}
