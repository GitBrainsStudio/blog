import { Post } from "src/app/Models/Post"

export class PostCreate
{
    Title:string
    Content:string
    TagsTitles:string[]
    ImagesIds:string[]

    constructor(post:Post)
    {
        this.Title = post.Title
        this.Content = post.Content
        this.TagsTitles = post.Tags.map(tag => tag.Title)
        this.ImagesIds = post.Images.map(image => image.Id)
    }
}