import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './Components/home/home.component';
import { FooterComponent } from './Components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PostComponent } from './Components/post/post.component';
import { PostDetailsComponent } from './Components/post-details/post-details.component';
import { PostEditComponent } from './Components/post-edit/post-edit.component';
import { PostPreviewsComponent } from './Components/post-previews/post-previews.component';
import { TopMenuComponent } from './Components/top-menu/top-menu.component';
import { AuthenticationComponent } from './Components/authentication/authentication.component';
import { TokenInterceptor } from './Handlers/TokenInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    TopMenuComponent,
    FooterComponent,
    HomeComponent,
    PostDetailsComponent,
    PostComponent,
    PostEditComponent,
    PostPreviewsComponent,
    AuthenticationComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MarkdownModule.forRoot()
  ],
  providers: [  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},],
  bootstrap: [AppComponent]
})
export class AppModule { }
