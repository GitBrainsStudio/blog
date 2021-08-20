import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { GTBRNS_BLOG_API } from "src/environments/environment";
import { Project } from "../Models/project";
import { Tag } from "../Models/Tag";








@Injectable({providedIn:"root"})
export class ProjectService
{
    constructor(private http:HttpClient) 
    {

    }

    GetAll() : Observable<Project[]>
    {
        return this.http.get(GTBRNS_BLOG_API + "projects").pipe(map(
            (projects:Project[]) => projects.map((project:Project) => 
                new Project(project.Id, project.Title, project.Description, 
                    

                    project.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title))
                    
                    
                    
                    
                    ))))
    }
}