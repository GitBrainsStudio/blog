import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GTBRNS_BLOG_API } from "src/environments/environment";
import { PostCreate } from "../Dtos/Posts/PostCreate";
import { PostDelete } from "../Dtos/Posts/PostDelete";
import { PostUpdate } from "../Dtos/Posts/PostUpdate";
import { Post } from "../Models/Post";
import { Tag } from "../Models/Tag";








@Injectable({providedIn:"root"})
export class PostService
{
    constructor(private http:HttpClient) 
    {

    }

    GetById(id:string) : Observable<Post>
    {
        return this.http.get(GTBRNS_BLOG_API + "posts/" + id).pipe(map((post:Post) =>
                new Post(post.Id, post.Title, post.Description, post.CreateDate, post.Content, 
                    
                    post.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title)))

                    ))
    }

    GetAll() : Observable<Post[]>
    {
        return this.http.get(GTBRNS_BLOG_API + "posts/").pipe(map(
            (posts:Post[]) => posts.map((post:Post) => 
                new Post(post.Id, post.Title, post.Description, post.CreateDate, post.Content, 
                    
                    
                    post.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title)))


                    )))
    }

    Create(postCreate:PostCreate)
    {
        return this.http.post(GTBRNS_BLOG_API + "posts/", postCreate)
    }

    Update(postUpdate:PostUpdate)
    {
        return this.http.put(GTBRNS_BLOG_API + "posts/", postUpdate)
    }

    Delete(postDelete:PostDelete)
    {
        const options = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json'
            }),
            body: {
              Id: 'ravi123'
            }
          }
        return this.http.delete(GTBRNS_BLOG_API + "posts/", { body: postDelete})
    }
}