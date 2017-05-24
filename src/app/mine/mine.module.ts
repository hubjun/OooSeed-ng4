import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {MineComponent} from "./mine.component";
import {MineRoutingModule} from "./mine-routing.module";
import { MySpellComponent } from './my-spell/my-spell.component';
import { MyJoinComponent } from './my-spell/my-join/my-join.component';
import { MyLaunchComponent } from './my-spell/my-launch/my-launch.component';
import {LocalService} from "../local/local.service";
import { MyLaunchDetailComponent } from './my-spell/my-launch-detail/my-launch-detail.component';
import { MyJoinDetailComponent } from './my-spell/my-join-detail/my-join-detail.component';
import {MineService} from "./mine.service";
import {MyContentComponent} from "./my-content/my-content.component";
import {MyMassageComponent} from "./my-massage/my-massage.component";
import {MyTeamComponent} from "./my-team/my-team.component";
import {PersonalScheduleComponent} from "./personal-schedule/personal-schedule.component";
import {MyComponent} from "./personal-schedule/my-component/my-component";
import {MyEditInfoComponent} from "./my-edit-info/my-edit-info.component";
import {EditDetailComponent} from "./my-edit-info/edit-detail/edit-detail";
import {EditBallComponent} from "./my-edit-info/edit-ball-info/edit-ball-info";
import {ChooseItemsComponent} from "./edit-components/choose-two-items/choose-two-items";
import {PotencyTeamComponent} from "./my-edit-info/potency-team-list/potency-team-list";
import {HomepageService} from '../homepage/homepage.service';
import { MyNoticeComponent } from './my-massage/my-notice/my-notice.component';
import { AtmeComponent } from './my-massage/atme/atme.component';
import { DiggmeComponent } from './my-massage/diggme/diggme.component';
import { AreaPickerComponent } from './my-edit-info/area-picker/area-picker.component';
import { MyInfoComponent } from './my-content/my-info/my-info.component';
import { MyDiggComponent } from './my-content/my-digg/my-digg.component';

@NgModule({
  imports: [
    SharedModule,
    MineRoutingModule
  ],
  declarations: [
    MineComponent,
    MySpellComponent,
    MyJoinComponent,
    MyLaunchComponent,
    MyLaunchDetailComponent,
    MyJoinDetailComponent,
    MyContentComponent,
    MyMassageComponent,
    MyTeamComponent,
    PersonalScheduleComponent,
    MyComponent,
    MyEditInfoComponent,
    EditDetailComponent,
    EditBallComponent,
    ChooseItemsComponent,
    EditDetailComponent,
    EditBallComponent,
    PotencyTeamComponent,
    MyNoticeComponent,
    AtmeComponent,
    DiggmeComponent,
    AreaPickerComponent,
    MyInfoComponent,
    MyDiggComponent,
  ],
  providers:[
    LocalService,
    MineService,
    HomepageService,
  ]
})
export class MineModule { }
