import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {HomeComponent} from "./home.component";
import {HomeRoutingModule} from "./home-routing.module";
import {HomeService} from "./home.service";
import { InfoComponent } from './info/info.component';
import { NewsComponent } from './info/news/news.component';
import {RouterModule} from "@angular/router";


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
  ],
  providers:[HomeService]
})
export class HomeModule { }
