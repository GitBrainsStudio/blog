import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './Pages/home/home.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { TopMenuComponent } from './Layout/top-menu/top-menu.component';
import { PostPreviewListComponent } from './Shared/post-preview-list/post-preview-list.component';
import { ProjectListComponent } from './Shared/project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PostDetailsComponent } from './Pages/post-details/post-details.component';
import { PostComponent } from './Cores/post/post.component';
import { PostEditComponent } from './Pages/post-edit/post-edit.component';
import { PostPreviewsComponent } from './Cores/post-previews/post-previews.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    FooterComponent,
    HomeComponent,
    PostPreviewListComponent,
    ProjectListComponent,
    PostDetailsComponent,
    PostComponent,
    PostEditComponent,
    PostPreviewsComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
