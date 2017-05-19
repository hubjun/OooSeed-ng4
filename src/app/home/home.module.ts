import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeService} from "./home.service";
import { InfoComponent } from './info/info.component';
import { NewsComponent } from './info/news/news.component';
import {RouterModule} from "@angular/router";
import { FeedComponent } from './feed/feed.component';
import { ArticleComponent } from './feed/article/article.component';
import {FeedbackSevice} from "../shared/service/FeedbackSevice";


@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    HomeRoutingModule,
  ],
  declarations: [
    HomeComponent,
    InfoComponent,
    NewsComponent,
    FeedComponent,
    ArticleComponent,
  ],
  providers:[HomeService,FeedbackSevice]
})
export class HomeModule { }
