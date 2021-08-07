/* import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PostPreviewHttp } from '../Models/http-models/post-preview.http';
import { Project, ProjectRow } from '../Models/project';



@Injectable({providedIn:"root"})
export class MdDataService
{
    constructor(private http: HttpClient)
    {
        
    }

    postPreviews() : Observable<PostPreviewHttp[]>
    {
       return this.http.get<PostPreviewHttp[]>('./assets/mds/posts.json');
    }

    projects() : Observable<Project[]>
    {
        return this.http.get<Project[]>('./assets/mds/projects.json');
    }

    projectColumns() : Observable<ProjectRow[]>
    {
        return this.projects().pipe(map((projects:Project[]) => { 

            let projectColumns = Array<ProjectRow>();

            
            let columnIndex = 1;
            let columnSumm = Math.ceil(projects.length / 4);

            let projectSliceEndIndex = 4;
            let projectSliceStartIndex = 0;


            while(columnIndex <= columnSumm)
            {
                projectColumns.push(new ProjectRow(columnIndex, projects.slice(projectSliceStartIndex, projectSliceEndIndex)));
                columnIndex++;
                projectSliceStartIndex += 4;
                projectSliceEndIndex += 4;
            }

            return projectColumns; 
        
        }));
    }


} */