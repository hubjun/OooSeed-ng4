import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HomepageComponent} from "./homepage.component";
import {EventsDetailComponent} from "./homepage-events/events-detail/events-detail.component";
import {ViewerAlbumComponent} from "./homepage-share/viewer/viewer.component";
import {MyVideoComponent} from "./homepage-share/my-video/my-video.component";
import {MyPictureComponent} from "./homepage-share/my-picture/my-picture.component";
import {MyFeedComponent} from "./homepage-share/my-feed/my-feed.component";
import {MyCareFansComponent} from "./homepage-fans/my-care-fans/my-care-fans.component";
import {MyFansComponent} from "./homepage-fans/my-fans/my-fans.component";

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent,
  },
  {
    path:'my-video',
    component:MyVideoComponent,
  },
  {
    path:'my-picture',
    component:MyPictureComponent,
  },
  {
    path:'viewer/:rows/:index',
    component:ViewerAlbumComponent
  },
  {
    path:'my-care-fans',
    component:MyCareFansComponent,
  },
  {
    path:'my-fans',
    component:MyFansComponent,
  },
  {
    path:'my-feed',
    component:MyFeedComponent,
  },
  {
    path:'events-detail',
    component:EventsDetailComponent,
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HomepageRoutingModule {
}
