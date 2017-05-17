import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {HomepageComponent} from "./homepage.component";
import {HomepageRoutingModule} from "./homepage-routing.module";
import {HomepageService} from "./homepage.service";
import { HomepageShareComponent } from './homepage-share/homepage-share.component';
import { HomepageCircleComponent } from './homepage-circle/homepage-circle.component';
import { HomepageFansComponent } from './homepage-fans/homepage-fans.component';
import { HomepageServiceComponent } from './homepage-service/homepage-service.component';

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
  ],
  providers:[HomepageService]
})
export class HomepageModule {
}
