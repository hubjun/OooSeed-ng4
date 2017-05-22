import {NgModule} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {HomepageComponent} from "./homepage.component";
import {HomepageShareComponent} from "./homepage-share/homepage-share.component";
import {HomepageServiceComponent} from "./homepage-service/homepage-service.component";
import {HomepageFansComponent} from "./homepage-fans/homepage-fans.component";
import {HomepageEventsComponent} from "./homepage-events/homepage-events.component";
import {MyVideoComponent} from "./my-video/my-video.component";
import {MyPictureComponent} from "./my-picture/my-picture.component";
import {MyCareFansComponent} from "./my-care-fans/my-care-fans.component";
import {MyFansComponent} from "./my-fans/my-fans.component";
import {EventsDetailComponent} from "./homepage-events/events-detail/events-detail.component";
import {EventsDetailAnnounceComponent} from "./homepage-events/events-detail-announce/events-detail-announce.component";
import {EventsDetailDetailComponent} from "app/homepage/homepage-events/events-detail-detail/events-detail-detail.component";
import {EventsDetailRuleComponent} from "./homepage-events/events-detail-rule/events-detail-rule.component";

const routes: Routes = [
  {
    path:'',
    component:HomepageComponent,
    children: [
      {
        path:'',
        component:HomepageShareComponent,
      },
      {
        path:'person-share',
        component:HomepageShareComponent,
      },
      {
        path:'person-events',
        component:HomepageEventsComponent,
      },
      {
        path:'person-fans',
        component:HomepageFansComponent,
      },
      {
        path:'person-service',
        component:HomepageServiceComponent,
      },
    ]
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
    path:'my-care-fans',
    component:MyCareFansComponent,
  },
  {
    path:'my-fans',
    component:MyFansComponent,
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
