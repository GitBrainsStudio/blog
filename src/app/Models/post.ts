import { Image } from "./Image"
import { Tag } from "./Tag"

export class Post
{

    Id:string
    Title:string
    Description:string
    CreateDate:string
    Content:string
    Tags:Tag[]
    Images:Image[]

    constructor(id:string, title:string, description:string, createDate:string, content:string, tags:Tag[], images:Image[])
    {
        this.Id = id
        this.Title = title
        this.Description = description
        this.CreateDate = createDate
        this.Content = content
        this.Tags = tags
        this.Images = images
    }
    
}