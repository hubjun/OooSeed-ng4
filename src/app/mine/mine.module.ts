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
    MyEditInfoComponent
  ],
  providers:[MineModule,LocalService,MineService]
})
export class MineModule { }
