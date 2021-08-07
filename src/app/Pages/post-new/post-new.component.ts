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
    this.tagService.GetAll().subscribe(tags => this.tags = tags )
    this.changeTagSearchInputWidth()
  }

  tags:Tag[]
  postCreateDto:PostCreate

  selectedTags:Tag[] = []

  tagSearch:string

  get TagSuggestions() : Tag[]
  {
    return this.tags.filter(tag => tag.Title.toLocaleLowerCase().includes(this.tagSearch.toLocaleLowerCase()) && !this.selectedTags.some(v => v.Id == tag.Id))
  }
  
  selectTag(tag:Tag)
  {
    this.selectedTags.push(tag)
    this.tagSearch = ""
    this.focusInput()
  }

  removeSelectedTag(index:number)
  {
    this.selectedTags.splice(index, 1)
    this.focusInput()
    this.changeTagSearchInputWidth()
  }

  get tagSearchInputPlaceholder() : string 
  {
    if (this.selectedTags.length == 0)
      return "например (angular python c#)"
    else return ""
  }

  get tagSearchInputWidth() : string
  {
    let minWidth = 20
    if (!this.tagSearch && this.selectedTags.length == 0) 
      return "100%"
    return (minWidth + this.tagSearch.length * 6).toString() + "px"
  }

  changeTagSearchInputWidth()
  {
    document.getElementById('tagSearchInput').style.width = this.tagSearchInputWidth
  }

  tagSearchChanged()
  {
    if (this.tagSearch)
    {
      
    }
    this.changeTagSearchInputWidth()
  }

  focusInput()
  {
    document.getElementById('tagSearchInput').focus();
  }


}
