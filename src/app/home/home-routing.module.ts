import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {NewsComponent} from "./info/news/news.component";

const routes:Routes = [
  {
    path:'',
    children:[
      {
        path:'',
        component:HomeComponent
      },
      {
        path:'news/:articleId',
        component:NewsComponent
      }
    ],

  },

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
