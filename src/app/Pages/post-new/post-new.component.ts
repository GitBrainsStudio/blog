import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostCreate } from 'src/app/Dtos/Posts/PostCreate';
import { Tag } from 'src/app/Models/Tag';
import { TagService } from 'src/app/Services/TagSerivce';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  constructor(private tagService:TagService) { }

  ngOnInit(): void {
    this.tags$ = this.tagService.GetAll()
  }

  tags$:Observable<Tag[]>
  postCreateDto:PostCreate

  
}
