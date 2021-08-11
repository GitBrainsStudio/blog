import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/Models/Post';
import { PostService } from 'src/app/Services/PostService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(
    private postService: PostService
    ) { }

  ngOnInit(): void {
    this.posts$ = this.postService.GetAll()
  }

  posts$ : Observable<Post[]>
}
