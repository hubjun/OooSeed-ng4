import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MineComponent} from "./mine.component";
import {MySpellComponent} from "./my-spell/my-spell.component";
import {MyLaunchComponent} from "./my-spell/my-launch/my-launch.component";
import {MyJoinComponent} from "./my-spell/my-join/my-join.component";
import {MyLaunchDetailComponent} from "./my-spell/my-launch-detail/my-launch-detail.component";
import {MyJoinDetailComponent} from "./my-spell/my-join-detail/my-join-detail.component";
import {MyContentComponent} from "./my-content/my-content.component";
import {MyMassageComponent} from "./my-massage/my-massage.component";
import {MyTeamComponent} from "./my-team/my-team.component";
import {MyEditInfoComponent} from "./my-edit-info/my-edit-info.component";
import {PersonalScheduleComponent} from "./personal-schedule/personal-schedule.component";
import {AuthGuardService} from "../shared/service/auth-guard.service";
import {EditDetailComponent} from "./my-edit-info/edit-detail/edit-detail";
import {PotencyTeamComponent} from "./my-edit-info/potency-team-list/potency-team-list";
import {EditBallComponent} from "./my-edit-info/edit-ball-info/edit-ball-info";
import {MyNoticeComponent} from './my-massage/my-notice/my-notice.component';
import {AtmeComponent} from './my-massage/atme/atme.component';
import {DiggmeComponent} from './my-massage/diggme/diggme.component';
import {AreaPickerComponent} from './my-edit-info/area-picker/area-picker.component';
import {MyInfoComponent} from './my-content/my-info/my-info.component';
import {MyDiggComponent} from './my-content/my-digg/my-digg.component';


const routes:Routes = [
  {
    path:'',
    component:MineComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'personal-schedule',
    component:PersonalScheduleComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-content',
    component:MyContentComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-massage',
    component:MyMassageComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-team',
    component:MyTeamComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-edit-info',
    component:MyEditInfoComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'edit-ball-info',
    component:EditBallComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'potency-team-list',
    component:PotencyTeamComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'edit-detail/:id',
    component:EditDetailComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-spell',
    component:MySpellComponent,
    canActivate:[AuthGuardService],
    canActivateChild:[AuthGuardService],
    children:[
      {
        path:'',
        component:MyLaunchComponent
      },
      {
        path:'my-launch',
        component:MyLaunchComponent
      },
      {
        path:'my-join',
        component:MyJoinComponent,
      },
      {
        path:'my-content',
        component:MyContentComponent,
      }
    ]
  },
  {
    path:'my-join-detail/:fightId',
    component:MyJoinDetailComponent
  },
  {
    path:'my-launch-detail/:fightId',
    component:MyLaunchDetailComponent
  },
  {
    path:'my-notice',
    component:MyNoticeComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'atme',
    component:AtmeComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'diggme',
    component:DiggmeComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'choose-city',
    component:AreaPickerComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-info',
    component:MyInfoComponent,
    canActivate:[AuthGuardService],
  },
  {
    path:'my-digg',
    component:MyDiggComponent,
    canActivate:[AuthGuardService],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule],

})
export class MineRoutingModule { }
