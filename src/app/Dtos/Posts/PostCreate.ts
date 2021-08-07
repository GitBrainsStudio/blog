export class PostCreate
{
    Title:string
    Content:string
    TagsIds:string[]

    constructor(title:string, content:string, tagsIds:string[])
    {
        this.Title = title
        this.Content = content
        this.TagsIds = tagsIds
    }
}