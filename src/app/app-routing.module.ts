import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { PostDetailsComponent } from './Components/post-details/post-details.component';
import { PostEditComponent } from './Components/post-edit/post-edit.component';




const routes: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'posts', children: 
    [
      {
        path: 'new', component: PostEditComponent,
      },
      {
        path: ':id', component: PostDetailsComponent,
      },
      {
        path: ':id/edit', component: PostEditComponent
      }
    ]
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
