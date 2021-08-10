import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PostCreate } from 'src/app/Dtos/Posts/PostCreate';
import { PostUpdate } from 'src/app/Dtos/Posts/PostUpdate';
import { Post } from 'src/app/Models/Post';
import { Tag } from 'src/app/Models/Tag';
import { PostService } from 'src/app/Services/PostService';
import { TagService } from 'src/app/Services/TagSerivce';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(
    private tagService:TagService,
    private postService:PostService,
    private router:Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.tagService.GetAll().subscribe(tags => this.tags = tags)

    this.activatedRoute.params.subscribe((params: Params) => {
      this.postId = params['id'];
      this.postEditmode = params['id'] != null;
    })

    if (this.postEditmode)
    {
      this.postService.GetById(this.postId)
          .subscribe(post => 
            {
              this.post = post;
             
              setTimeout(() => 
              {
                this.changeTagSearchInputWidth()
              },
              0.1);
            })
    }
    
    if (!this.postEditmode)
    {
      this.post = new Post(
        null,
        null,
        null,
        null,
        null,
        []
      )

      
      setTimeout(() => 
      {
        this.changeTagSearchInputWidth()
      },
      0.1);
    }
  }


  tags:Tag[]
  postCreate:PostCreate

  tagSearch:string
  
  postId:string
  postEditmode: boolean = false;
  post:Post
  
  get TagSuggestions() : Tag[]
  {
    return this.tags.filter(tag => tag.Title.toLocaleLowerCase().includes(this.tagSearch.toLocaleLowerCase()) && !this.post.Tags.some(v => v.Id == tag.Id))
  }
  
  selectTag(tag:Tag)
  {
    this.post.Tags.push(tag)
    this.tagSearch = ""
    this.focusInput()
  }

  removeSelectedTag(index:number)
  {
    this.post.Tags.splice(index, 1)
    this.focusInput()
    this.changeTagSearchInputWidth()
  }

  get tagSearchInputPlaceholder() : string 
  {
    
    if (this.post.Tags.length == 0)
      return "например (angular python c#)"
    else return ""
  }

  get tagSearchInputWidth() : string
  { 
   
    let minWidth = 20
    if (!this.tagSearch && this.post.Tags.length == 0) 
    {
      return "100%"
    }

    else if (!this.tagSearch && this.post.Tags.length > 0) 
      return (minWidth).toString() + "px"


    return (minWidth + this.tagSearch.length * 6).toString() + "px"
  }

  get savePostButtonMessage() : string
  {
    if (this.postEditmode)
      return "Сохранить изменения"
    return "Отправить на публикацию"
  }

  
  changeTagSearchInputWidth()
  {
      document.getElementById('tagSearchInput').style.width = this.tagSearchInputWidth
  }

  tagSearchChanged()
  {
    this.changeTagSearchInputWidth()
  }

  focusInput()
  {
    document.getElementById('tagSearchInput').focus();
  }

  save()
  {
    if (this.postEditmode)
    {
      this.postService.Update(new PostUpdate(this.post))
          .subscribe(answer => { this.router.navigate(['/'])})
    }

    if (!this.postEditmode)
    {
      this.postService.Create(new PostCreate(this.post))
          .subscribe(answer => { this.router.navigate(['/'])})
    }
  }

}
