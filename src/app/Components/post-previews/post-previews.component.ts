import { Component, Input, OnInit } from '@angular/core';
import { PostDelete } from 'src/app/Dtos/Posts/PostDelete';
import { Post } from 'src/app/Models/Post';
import { AuthenticationService } from 'src/app/Services/AuthenticationService';
import { PostService } from 'src/app/Services/PostService';

@Component({
  selector: 'app-post-previews',
  templateUrl: './post-previews.component.html',
  styleUrls: ['./post-previews.component.css']
})
export class PostPreviewsComponent implements OnInit {

  constructor(
    private postService:PostService,
    public authenticationService:AuthenticationService) { }

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
