import { GTBRNS_BLOG_API } from "src/environments/environment";

export class Image
{
    Id:string
    Title:string

    get Src() :string
    {
        return GTBRNS_BLOG_API + "files/images/" + this.Title
    }

    UploadDate:string

    constructor(id:string, title:string, uploadDate:string)
    {   
        this.Id = id;
        this.Title = title;
        this.UploadDate = uploadDate;
    }
}