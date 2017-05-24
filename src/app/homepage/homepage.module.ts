import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {HomepageComponent} from "./homepage.component";
import {HomepageRoutingModule} from "./homepage-routing.module";
import {HomepageService} from "./homepage.service";
import { HomepageShareComponent } from './homepage-share/homepage-share.component';
import { HomepageEventsComponent } from './homepage-events/homepage-events.component';
import { HomepageFansComponent } from './homepage-fans/homepage-fans.component';
import { HomepageServiceComponent } from './homepage-service/homepage-service.component';
import {MemberModule} from "./member-module/member-module.component";
import { EventsDetailComponent } from './homepage-events/events-detail/events-detail.component';
import {ViewerAlbumComponent} from "./homepage-share/viewer/viewer.component";
import { EventsDetailDetailComponent } from './homepage-events/events-detail-detail/events-detail-detail.component';
import { EventsDetailRuleComponent } from './homepage-events/events-detail-rule/events-detail-rule.component';
import { EventsDetailAnnounceComponent } from './homepage-events/events-detail-announce/events-detail-announce.component';
import {MyPictureComponent} from "./homepage-share/my-picture/my-picture.component";
import {MyVideoComponent} from "./homepage-share/my-video/my-video.component";
import {MyFansComponent} from "./homepage-fans/my-fans/my-fans.component";
import {MyCareFansComponent} from "./homepage-fans/my-care-fans/my-care-fans.component";

@NgModule({
  imports: [
    SharedModule,
    HomepageRoutingModule
  ],
  declarations: [
    HomepageComponent,
    HomepageShareComponent,
    HomepageEventsComponent,
    HomepageFansComponent,
    HomepageServiceComponent,
    MyPictureComponent,
    MyVideoComponent,
    MyFansComponent,
    MyCareFansComponent,
    MemberModule,
    EventsDetailComponent,
    EventsDetailDetailComponent,
    EventsDetailRuleComponent,
    EventsDetailAnnounceComponent,
    ViewerAlbumComponent,
  ],
  providers:[HomepageService]
})
export class HomepageModule {
}
