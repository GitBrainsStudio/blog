import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GTBRNS_BLOG_API } from "src/environments/environment";
import { ImageUpload } from "../Dtos/Images/ImageUpload";








@Injectable({providedIn:"root"})
export class ImageService
{
    constructor(private http:HttpClient)
    {

    }

    Upload(imageUpload:ImageUpload) 
    {
        return this.http.post(GTBRNS_BLOG_API + "images", imageUpload)
    }
}