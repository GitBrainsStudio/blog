import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostDelete } from 'src/app/Dtos/Posts/PostDelete';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/PostService';
import { RefreshService } from 'src/app/Services/refresh.service';

@Component({
  selector: 'app-post-previews',
  templateUrl: './post-previews.component.html',
  styleUrls: ['./post-previews.component.css']
})
export class PostPreviewsComponent implements OnInit {

  constructor(
    public refreshService : RefreshService,
    private postService:PostService,
    private router:Router) { }

  ngOnInit(): void {
  }

  @Input() postPreviews : Post[];

  delete(post:Post, index:number)
  {
    if(confirm("Вы действительно хотите удалить этот пост?")) {
      this.postService.Delete(new PostDelete(post.Id))
        .subscribe(answer => { this.postPreviews.splice(index, 1) })
    }
  }
}
