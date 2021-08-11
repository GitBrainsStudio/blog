import { Tag } from "./Tag"









export class Project 
{

    Id:string
    Title:string
    Description:string
    Tags:Tag[]

    constructor(
        id:string,
        title:string,
        description:string,
        tags:Tag[]
    )
    {
        this.Id = id
        this.Title = title
        this.Description = description
        this.Tags = tags
    }
}