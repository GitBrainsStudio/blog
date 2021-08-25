import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GTBRNS_BLOG_API } from "src/environments/environment";
import { ImageDelete } from "../Dtos/Images/ImageDelete";
import { ImageUpload } from "../Dtos/Images/ImageUpload";
import { Image } from "../Models/Image";








@Injectable({providedIn:"root"})
export class ImageService
{
    constructor(private http:HttpClient)
    {

    }

    Upload(imageUpload:ImageUpload) : Observable<Image>
    {
        return this.http.post(GTBRNS_BLOG_API + "images", imageUpload)
        .pipe(map((image:Image) => new Image(image.Id, image.Title, image.UploadDate)))
    }

    Delete(imageDelete:ImageDelete)
    {
        return this.http.delete(GTBRNS_BLOG_API + "images/", { body: imageDelete})
    }
}