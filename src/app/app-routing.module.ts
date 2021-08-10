import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { PostDetailsComponent } from './Pages/post-details/post-details.component';
import { PostEditComponent } from './Pages/post-edit/post-edit.component';




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
  imports: [RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation:"reload" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
