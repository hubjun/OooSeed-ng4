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
  ChineseWeek,
  changetime
} from './pipes/shared.pipe'
import {ToolbarRollerComponent} from "./components/toolbar/toolbar-roller";
import {RollerDirective} from "./directives/shared.directive";
import { BadgesComponent } from './components/badges/badges.component';
import {UserDataService} from '../shared/tools/user-data.service';
import {MissingDefaultContentComponent} from "./components/missing-page/missing-page";
import {SelectComponent} from "./components/selects/selects";
import {ToolbarNavComponent} from "./components/toolbar/toolbar-nav";
import {RouterModule} from "@angular/router";
import { FeedProfileComponent } from './components/feed-profile/feed-profile.component';
import {LazyLoadImageModule} from "ng-lazyload-image";
import { CommentsComponent } from './components/comments/comments.component';
import {InfiniteScrollModule} from "ngx-infinite-scroll";
// import {KSSwiperModule} from "angular2-swiper";
import {Content} from "./components/toolbar/toolbar-content";
import {GapBgComponent} from "./components/gap-bg/gap-bg.component";
import { MomentModule } from "angular2-moment";
import { ViewerComponent } from './components/viewer/viewer.component';
import { SwiperContainerComponent } from './components/swiper/swiper-container/swiper-container.component';
import { SwiperSlideComponent } from './components/swiper/swiper-slide/swiper-slide.component';
import { ModalComponent } from './components/modal/modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    MomentModule
  ],
  declarations: [
    Content,
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    ChineseWeek,
    recruitWeek,
    changetime,
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
    DownAppComponent,
    FeedProfileComponent,
    CommentsComponent,
    GapBgComponent,
    SelectComponent,
    ViewerComponent,
    SwiperContainerComponent,
    SwiperSlideComponent,
    ModalComponent,
   ],
  exports: [
    CommonModule,
    FormsModule,
    LazyLoadImageModule,
    InfiniteScrollModule,
    MomentModule,
    Content,
    SafeStyle,
    TruncatePipe,
    ChineseDay,
    recruitWeek,
    changetime,
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
    DownAppComponent,
    FeedProfileComponent,
    CommentsComponent,
    GapBgComponent,
    SelectComponent,
    ViewerComponent,
    SwiperContainerComponent,
    SwiperSlideComponent,
    ModalComponent,
  ],


  providers:[ToolsService, StatusCodeService, UserDataService]
})
export class SharedModule { }
