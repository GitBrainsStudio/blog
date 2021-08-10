import { Post } from "src/app/Models/Post"

export class PostUpdate
{
    Id:string
    Title:string
    Content:string
    TagsIds:string[]

    constructor(post:Post)
    {
        this.Id = post.Id
        this.Title = post.Title
        this.Content = post.Content
        this.TagsIds = post.Tags.map(tag => tag.Id)
    }
}