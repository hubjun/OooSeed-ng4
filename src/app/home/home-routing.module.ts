import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {NewsComponent} from "./info/news/news.component";
import {InfoComponent} from "./info/info.component";
import {FeedComponent} from "./feed/feed.component";
import {ArticleComponent} from "./feed/article/article.component";

const routes:Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'',
        redirectTo:'/home/info',
        pathMatch:'full'
      },
      {
        path:'info',
        component:InfoComponent,
      },
      {
        path:'feed',
        component:FeedComponent
      }
    ],
  },
  {
    path:'news/:articleId',
    component:NewsComponent
  },
  {
    path:'article/:feedId',
    component:ArticleComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
