import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HomeComponent } from './Pages/home/home.component';
import { PostComponent } from './Pages/post/post.component';
import { FooterComponent } from './Layout/footer/footer.component';
import { TopMenuComponent } from './Layout/top-menu/top-menu.component';
import { PostPreviewListComponent } from './Shared/post-preview-list/post-preview-list.component';
import { ProjectListComponent } from './Shared/project-list/project-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostNewComponent } from './Pages/post-new/post-new.component';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    FooterComponent,
    HomeComponent,
    PostComponent,
    PostPreviewListComponent,
    ProjectListComponent,
    PostNewComponent
  ],
  imports: [
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
