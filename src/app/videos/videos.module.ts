import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../shared/shared.module";
import {VideoRoutingModule} from "./video-routing.module";
import {VideosService} from "./videos.service";
import { VideoMoreComponent } from './video-more/video-more.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { VideoHomeComponent } from './video-home/video-home.component';
import { CardCategoryComponent } from './components/card-category/card-category.component';
import { PlayerListComponent } from './components/player-list/player-list.component';
import { PlayerListDetailInfoComponent } from './components/player-list-detail-info/player-list-detail-info.component';

@NgModule({
  imports: [
    SharedModule,
    VideoRoutingModule
  ],
  declarations: [
    VideoMoreComponent,
    VideoDetailComponent,
    VideoHomeComponent,
    CardCategoryComponent,
    PlayerListComponent,
    PlayerListDetailInfoComponent
  ],
  providers:[VideosService]
})
export class VideosModule { }
