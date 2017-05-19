import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {HomepageComponent} from "./homepage.component";
import {HomepageRoutingModule} from "./homepage-routing.module";
import {HomepageService} from "./homepage.service";
import { HomepageShareComponent } from './homepage-share/homepage-share.component';
import { HomepageCircleComponent } from './homepage-circle/homepage-circle.component';
import { HomepageFansComponent } from './homepage-fans/homepage-fans.component';
import { HomepageServiceComponent } from './homepage-service/homepage-service.component';
import { MyPictureComponent } from './my-picture/my-picture.component';
import { MyVideoComponent } from './my-video/my-video.component';
import { MyFansComponent } from './my-fans/my-fans.component';
import { MyCareFansComponent } from './my-care-fans/my-care-fans.component';
import {MemberModule} from "./member-module/member-module.component";

@NgModule({
  imports: [
    SharedModule,
    HomepageRoutingModule
  ],
  declarations: [
    HomepageComponent,
    HomepageShareComponent,
    HomepageCircleComponent,
    HomepageFansComponent,
    HomepageServiceComponent,
    MyPictureComponent,
    MyVideoComponent,
    MyFansComponent,
    MyCareFansComponent,
    MemberModule
  ],
  providers:[HomepageService]
})
export class HomepageModule {
}
