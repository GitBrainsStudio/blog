import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GTBRNS_BLOG_API } from "src/environments/environment.prod";
import { Tag } from "../Models/Tag";








@Injectable({providedIn:"root"})
export class TagService
{
    constructor(private http:HttpClient) 
    {

    }

    GetAll() : Observable<Tag[]>
    {
        return this.http.get(GTBRNS_BLOG_API + "tags").pipe(map(
            (tags:Tag[]) => tags.map((tag:Tag) => 
                new Tag(tag.Id, tag.Title))))
    }
}