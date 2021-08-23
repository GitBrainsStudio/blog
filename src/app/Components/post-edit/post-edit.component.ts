import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ImageUpload } from 'src/app/Dtos/Images/ImageUpload';
import { PostCreate } from 'src/app/Dtos/Posts/PostCreate';
import { PostUpdate } from 'src/app/Dtos/Posts/PostUpdate';
import { Post } from 'src/app/Models/Post';
import { Tag } from 'src/app/Models/Tag';
import { ImageService } from 'src/app/Services/ImageService';
import { PostService } from 'src/app/Services/PostService';
import { TagService } from 'src/app/Services/TagSerivce';
import { GTBRNS_BLOG_API } from 'src/environments/environment';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  constructor(
    private tagService:TagService,
    private postService:PostService,
    private imageService:ImageService,
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
                this.changeTextAreaHeighth()
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
        this.changeTextAreaHeighth()
      },
      0.1);
    }
  }


  tags:Tag[] = []
  postCreate:PostCreate

  tagSearch:string
  
  postId:string
  postEditmode: boolean = false;
  post:Post
  
  get TagSuggestions() : Tag[]
  {
    return this.tags.filter(tag => tag.Title.toLocaleLowerCase().includes(this.tagSearch.toLocaleLowerCase()) && !this.post.Tags.some(v => v.Id == tag.Id))
  }

  addNewTag()
  {
    if (!this.tagSearch)
      return

      
    if (this.tags.some(tag => tag.Title.toLocaleLowerCase() == this.tagSearch.toLocaleLowerCase()))
    {
      let findTag = this.tags.find(tag => tag.Title.toLocaleLowerCase() == this.tagSearch.toLocaleLowerCase())
      
      if (this.post.Tags.some(selectedtag => selectedtag.Id == findTag.Id))
      {
        this.tagSearch = ""
        return
      }

      this.selectTag(findTag)
      return
    }

    if (this.post.Tags.some(tag => tag.Title.toLocaleLowerCase() == this.tagSearch.toLocaleLowerCase()))
    {
      this.tagSearch = ""
      return
    }

      

    let tag = new Tag(null, this.tagSearch)
    this.selectTag(tag)
  }
  
  selectTag(tag:Tag)
  {
    this.post.Tags.push(tag)
    this.tagSearch = ""
    this.focusInput()
  }

  tagInputBackspaceEvent()
  {
    if (!this.tagSearch)
    {
      this.post.Tags.splice(this.post.Tags.length - 1, 1)
      this.changeTagSearchInputWidth()
    }
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

  get postEditPageTitle() : string
  {
    if (this.postEditmode)
      return "Редактирование поста"
    return "Новый пост"
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

  changeTextAreaHeighth(){
    let  textArea = document.getElementById("postContentTextArea")       
    textArea.style.overflow = 'hidden';
    textArea.style.height = '100px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }

  images: (string | ArrayBuffer)[] = []
  imageSrc: string | ArrayBuffer;
  files = []


  onFileChanged(event: any) {
    if (event.target.files && event.target.files[0]) {

      let files = event.target.files;
      if (files) {
        for (let file of files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            
            let imageBytes = e.target.result.split(',')[1]
            this.imageService.Upload(new ImageUpload(imageBytes))
              .subscribe(imageTitle => 
                
                this.post.ImagesSrcs.push(GTBRNS_BLOG_API + "files/images/" + imageTitle)

                )
          }
          
          reader.readAsDataURL(file);
        }
      }
  }
  }
  
  deletePostImage(imageIndex:number)
  {
    this.post.ImagesSrcs.splice(imageIndex, 1)
  }

}
