[1mdiff --git a/src/app/Components/post-edit/post-edit.component.html b/src/app/Components/post-edit/post-edit.component.html[m
[1mindex 022749b..5d0a6f7 100644[m
[1m--- a/src/app/Components/post-edit/post-edit.component.html[m
[1m+++ b/src/app/Components/post-edit/post-edit.component.html[m
[36m@@ -50,14 +50,14 @@[m
                         <h4 class="mt-4">Изображения</h4>[m
                         <div class="uploader">[m
                             [m
[31m-                            <div class="uploader-item-preview mr-2 mb-2" *ngFor="let imageSrc of post.ImagesSrcs; let i = index;" >[m
[31m-                                <button class="delete-btn" (click)="deletePostImage(i)"></button>[m
[32m+[m[32m                            <div class="uploader-item-preview mr-2 mb-2" *ngFor="let image of post.Images; let i = index;" >[m
[32m+[m[32m                                <button class="delete-btn" (click)="deletePostImage(image, i)"></button>[m
                                [m
[31m-                                <img id="blah" [src]="imageSrc" alt="your image" />[m
[32m+[m[32m                                <img id="blah" [src]="image.Src" alt="your image" />[m
                             </div>[m
                            [m
                             <label for="img" class="uploader-item"  >[m
[31m-                                <input style="visibility: hidden;" multiple type="file" id="img" name="img" accept="image/*" (change)="onFileChanged($event)">[m
[32m+[m[32m                                <input style="visibility: hidden;" type="file" id="img" name="img" accept="image/*" (change)="onFileChanged($event)">[m
                             </label>[m
                            [m
                         </div>[m
[1mdiff --git a/src/app/Components/post-edit/post-edit.component.ts b/src/app/Components/post-edit/post-edit.component.ts[m
[1mindex 5cb9334..1f1ec3b 100644[m
[1m--- a/src/app/Components/post-edit/post-edit.component.ts[m
[1m+++ b/src/app/Components/post-edit/post-edit.component.ts[m
[36m@@ -1,8 +1,11 @@[m
 import { AfterViewInit, Component, OnInit } from '@angular/core';[m
 import { ActivatedRoute, Params, Router } from '@angular/router';[m
[32m+[m[32mimport { read } from 'fs';[m
[32m+[m[32mimport { ImageDelete } from 'src/app/Dtos/Images/ImageDelete';[m
 import { ImageUpload } from 'src/app/Dtos/Images/ImageUpload';[m
 import { PostCreate } from 'src/app/Dtos/Posts/PostCreate';[m
 import { PostUpdate } from 'src/app/Dtos/Posts/PostUpdate';[m
[32m+[m[32mimport { Image } from 'src/app/Models/Image';[m
 import { Post } from 'src/app/Models/Post';[m
 import { Tag } from 'src/app/Models/Tag';[m
 import { ImageService } from 'src/app/Services/ImageService';[m
[36m@@ -57,6 +60,7 @@[m [mexport class PostEditComponent implements OnInit {[m
         null,[m
         null,[m
         null,[m
[32m+[m[32m        [],[m
         [][m
       )[m
 [m
[36m@@ -217,38 +221,30 @@[m [mexport class PostEditComponent implements OnInit {[m
     textArea.style.height = textArea.scrollHeight + 'px';[m
   }[m
 [m
[31m-  images: (string | ArrayBuffer)[] = [][m
[31m-  imageSrc: string | ArrayBuffer;[m
[31m-  files = [][m
[31m-[m
 [m
   onFileChanged(event: any) {[m
[31m-    if (event.target.files && event.target.files[0]) {[m
[31m-[m
[31m-      let files = event.target.files;[m
[31m-      if (files) {[m
[31m-        for (let file of files) {[m
[31m-          let reader = new FileReader();[m
[31m-          reader.onload = (e: any) => {[m
[31m-            [m
[31m-            let imageBytes = e.target.result.split(',')[1][m
[31m-            this.imageService.Upload(new ImageUpload(imageBytes))[m
[31m-              .subscribe(imageTitle => [m
[31m-                [m
[31m-                this.post.ImagesSrcs.push(GTBRNS_BLOG_API + "files/images/" + imageTitle)[m
[31m-[m
[31m-                )[m
[31m-          }[m
[31m-          [m
[31m-          reader.readAsDataURL(file);[m
[31m-        }[m
[32m+[m
[32m+[m[32m    if (event.target.files && event.target.files[0])[m
[32m+[m[32m    {[m
[32m+[m[32m      let reader = new FileReader();[m
[32m+[m[32m      console.log('1')[m
[32m+[m[32m      reader.readAsDataURL(event.target.files[0]);[m
[32m+[m[32m      console.log('2')[m
[32m+[m[32m      reader.onload = (e: any) => {[m
[32m+[m[41m        [m
[32m+[m[32m        let imageBytes = e.target.result.split(',')[1][m
[32m+[m[32m        console.log('3')[m
[32m+[m[32m        this.imageService.Upload(new ImageUpload(imageBytes))[m
[32m+[m[32m          .subscribe(image => { this.post.Images.push(image);  console.log('4') })[m
       }[m
[32m+[m[41m  [m
[32m+[m[32m    }[m[41m  [m
   }[m
[31m-  }[m
[32m+[m
   [m
[31m-  deletePostImage(imageIndex:number)[m
[32m+[m[32m  deletePostImage(selectedImage:Image, selectedImageindex:number)[m
   {[m
[31m-    this.post.ImagesSrcs.splice(imageIndex, 1)[m
[32m+[m[32m    this.post.Images.splice(selectedImageindex, 1)[m
   }[m
 [m
 }[m
[1mdiff --git a/src/app/Dtos/Posts/PostCreate.ts b/src/app/Dtos/Posts/PostCreate.ts[m
[1mindex 2cd2dc3..81b72db 100644[m
[1m--- a/src/app/Dtos/Posts/PostCreate.ts[m
[1m+++ b/src/app/Dtos/Posts/PostCreate.ts[m
[36m@@ -5,11 +5,13 @@[m [mexport class PostCreate[m
     Title:string[m
     Content:string[m
     TagsTitles:string[][m
[32m+[m[32m    ImagesIds:string[][m
 [m
     constructor(post:Post)[m
     {[m
         this.Title = post.Title[m
         this.Content = post.Content[m
         this.TagsTitles = post.Tags.map(tag => tag.Title)[m
[32m+[m[32m        this.ImagesIds = post.Images.map(image => image.Id)[m
     }[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/app/Dtos/Posts/PostUpdate.ts b/src/app/Dtos/Posts/PostUpdate.ts[m
[1mindex d2363cc..9ca501f 100644[m
[1m--- a/src/app/Dtos/Posts/PostUpdate.ts[m
[1m+++ b/src/app/Dtos/Posts/PostUpdate.ts[m
[36m@@ -6,6 +6,7 @@[m [mexport class PostUpdate[m
     Title:string[m
     Content:string[m
     TagsTitles:string[][m
[32m+[m[32m    ImagesIds:string[][m
 [m
     constructor(post:Post)[m
     {[m
[36m@@ -13,5 +14,6 @@[m [mexport class PostUpdate[m
         this.Title = post.Title[m
         this.Content = post.Content[m
         this.TagsTitles = post.Tags.map(tag => tag.Title)[m
[32m+[m[32m        this.ImagesIds = post.Images.map(image => image.Id)[m
     }[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/app/Models/post.ts b/src/app/Models/post.ts[m
[1mindex ac52400..d548c22 100644[m
[1m--- a/src/app/Models/post.ts[m
[1m+++ b/src/app/Models/post.ts[m
[36m@@ -1,3 +1,4 @@[m
[32m+[m[32mimport { Image } from "./Image"[m
 import { Tag } from "./Tag"[m
 [m
 export class Post[m
[36m@@ -9,9 +10,9 @@[m [mexport class Post[m
     CreateDate:string[m
     Content:string[m
     Tags:Tag[][m
[31m-    ImagesSrcs:string[] = [][m
[32m+[m[32m    Images:Image[][m
 [m
[31m-    constructor(id:string, title:string, description:string, createDate:string, content:string, tags:Tag[])[m
[32m+[m[32m    constructor(id:string, title:string, description:string, createDate:string, content:string, tags:Tag[], images:Image[])[m
     {[m
         this.Id = id[m
         this.Title = title[m
[36m@@ -19,6 +20,7 @@[m [mexport class Post[m
         this.CreateDate = createDate[m
         this.Content = content[m
         this.Tags = tags[m
[32m+[m[32m        this.Images = images[m
     }[m
     [m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/app/Services/ImageService.ts b/src/app/Services/ImageService.ts[m
[1mindex 3892f7a..85a5be2 100644[m
[1m--- a/src/app/Services/ImageService.ts[m
[1m+++ b/src/app/Services/ImageService.ts[m
[36m@@ -1,8 +1,11 @@[m
[31m-import { HttpClient } from "@angular/common/http";[m
[32m+[m[32mimport { HttpClient, HttpHeaders } from "@angular/common/http";[m
 import { Injectable } from "@angular/core";[m
 import { Observable } from "rxjs";[m
[32m+[m[32mimport { map } from "rxjs/operators";[m
 import { GTBRNS_BLOG_API } from "src/environments/environment";[m
[32m+[m[32mimport { ImageDelete } from "../Dtos/Images/ImageDelete";[m
 import { ImageUpload } from "../Dtos/Images/ImageUpload";[m
[32m+[m[32mimport { Image } from "../Models/Image";[m
 [m
 [m
 [m
[36m@@ -19,8 +22,14 @@[m [mexport class ImageService[m
 [m
     }[m
 [m
[31m-    Upload(imageUpload:ImageUpload) [m
[32m+[m[32m    Upload(imageUpload:ImageUpload) : Observable<Image>[m
     {[m
         return this.http.post(GTBRNS_BLOG_API + "images", imageUpload)[m
[32m+[m[32m        .pipe(map((image:Image) => new Image(image.Id, image.Title, image.UploadDate)))[m
[32m+[m[32m    }[m
[32m+[m
[32m+[m[32m    Delete(imageDelete:ImageDelete)[m
[32m+[m[32m    {[m
[32m+[m[32m        return this.http.delete(GTBRNS_BLOG_API + "images/", { body: imageDelete})[m
     }[m
 }[m
\ No newline at end of file[m
[1mdiff --git a/src/app/Services/PostService.ts b/src/app/Services/PostService.ts[m
[1mindex 7606775..bab4492 100644[m
[1m--- a/src/app/Services/PostService.ts[m
[1m+++ b/src/app/Services/PostService.ts[m
[36m@@ -6,6 +6,7 @@[m [mimport { GTBRNS_BLOG_API } from "src/environments/environment";[m
 import { PostCreate } from "../Dtos/Posts/PostCreate";[m
 import { PostDelete } from "../Dtos/Posts/PostDelete";[m
 import { PostUpdate } from "../Dtos/Posts/PostUpdate";[m
[32m+[m[32mimport { Image } from "../Models/Image";[m
 import { Post } from "../Models/Post";[m
 import { Tag } from "../Models/Tag";[m
 [m
[36m@@ -29,7 +30,9 @@[m [mexport class PostService[m
         return this.http.get(GTBRNS_BLOG_API + "posts/" + id).pipe(map((post:Post) =>[m
                 new Post(post.Id, post.Title, post.Description, post.CreateDate, post.Content, [m
                     [m
[31m-                    post.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title)))[m
[32m+[m[32m                    post.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title)),[m
[32m+[m
[32m+[m[32m                    post.Images.map((image:Image) => new Image(image.Id, image.Title, image.UploadDate)))[m
 [m
                     ))[m
     }[m
[36m@@ -41,7 +44,9 @@[m [mexport class PostService[m
                 new Post(post.Id, post.Title, post.Description, post.CreateDate, post.Content, [m
                     [m
                     [m
[31m-                    post.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title)))[m
[32m+[m[32m                    post.Tags.map((tag:Tag) => new Tag(tag.Id, tag.Title)),[m
[32m+[m
[32m+[m[32m                    post.Images.map((image:Image) => new Image(image.Id, image.Title, image.UploadDate)))[m
 [m
 [m
                     )))[m
[36m@@ -59,14 +64,6 @@[m [mexport class PostService[m
 [m
     Delete(postDelete:PostDelete)[m
     {[m
[31m-        const options = {[m
[31m-            headers: new HttpHeaders({[m
[31m-              'Content-Type': 'application/json'[m
[31m-            }),[m
[31m-            body: {[m
[31m-              Id: 'ravi123'[m
[31m-            }[m
[31m-          }[m
         return this.http.delete(GTBRNS_BLOG_API + "posts/", { body: postDelete})[m
     }[m
 }[m
\ No newline at end of file[m
