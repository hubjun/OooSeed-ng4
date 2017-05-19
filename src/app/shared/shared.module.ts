import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {ToolbarHeaderComponent} from "./components/toolbar/toolbar-header";
import {ToolbarTitleComponent} from "./components/toolbar/toolbar-title";
import {ToolbarMenuComponent} from "./components/toolbar/toolbar-menu";
import {ToolbarBackButtonComponent} from "./components/toolbar/toolbar-back";
import {ToolbarHomeComponent} from "./components/toolbar/toolbar-home";
import {ToolsService} from "./tools/tools.service";
import {StatusCodeService} from "./status-code/status-code.service";
import { SliderComponent } from './components/slider/slider.component';
import { DownAppComponent } from './components/go-down-app/go-down-app';
import {
  SafeStyle,
  TruncatePipe,
  ChineseDay,
  recruitWeek,
  Distance,
  ChineseWeek
} from './pipes/shared.pipe'
import {ToolbarRollerComponent} from "./components/toolbar/toolbar-roller";
import {RollerDirective} from "./directives/shared.directive";
import { BadgesComponent } from './components/badges/badges.component';
import {UserDataService} from '../shared/tools/user-data.service';
import {MissingDefaultContentComponent} from "./components/missing-page/missing-page";
import {SelectComponent} from "./components/selects/selects";
import { ViewMoreComponent } from './components/view-more/view-more.component';
import {ToolbarNavComponent} from "./components/toolbar/toolbar-nav";
import {RouterModule} from "@angular/router";
import { FeedProfileComponent } from './components/feed-profile/feed-profile.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import { CommentsComponent } from './components/comments/comments.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {KSSwiperModule} from "angular2-swiper";
import {Content} from "./components/toolbar/toolbar-content";
import {GapBgComponent} from "./components/gap-bg/gap-bg.component";
import { MomentModule } from "angular2-moment";
import {SwiperConfigInterface} from "ngx-swiper-wrapper";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    KSSwiperModule,
    MomentModule
  ],
  declarations: [
    Content,
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    ChineseWeek,
    recruitWeek,
    Distance,
    ToolbarNavComponent,
    ToolbarHeaderComponent,
    ToolbarTitleComponent,
    ToolbarMenuComponent,
    ToolbarBackButtonComponent,
    ToolbarHomeComponent,
    ToolbarRollerComponent,
    SliderComponent,
    RollerDirective,
    BadgesComponent,
    MissingDefaultContentComponent,
    ViewMoreComponent,
    DownAppComponent,
    FeedProfileComponent,
    CommentsComponent,
    ViewMoreComponent,
    GapBgComponent,
    SelectComponent
   ],
  exports: [
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    KSSwiperModule,
    MomentModule,
    Content,
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    recruitWeek,
    Distance,
    ChineseWeek,
    ToolbarNavComponent,
    ToolbarHeaderComponent,
    ToolbarTitleComponent,
    ToolbarMenuComponent,
    ToolbarBackButtonComponent,
    ToolbarHomeComponent,
    ToolbarRollerComponent,
    SliderComponent,
    RollerDirective,
    BadgesComponent,
    MissingDefaultContentComponent,
    ViewMoreComponent,
    DownAppComponent,
    FeedProfileComponent,
    CommentsComponent,
    GapBgComponent,
    SelectComponent
  ],


  providers:[ToolsService, StatusCodeService, UserDataService]
})
export class SharedModule { }
