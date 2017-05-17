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

const routes:Routes = [
  {
    path:'',
    component:MineComponent
  },
  {
    path:'personal-schedule',
    component:PersonalScheduleComponent,
  },
  {
    path:'my-content',
    component:MyContentComponent,
  },
  {
    path:'my-massage',
    component:MyMassageComponent,
  },
  {
    path:'my-team',
    component:MyTeamComponent,
  },
  {
    path:'my-edit-info',
    component:MyEditInfoComponent,
  },
  {
    path:'my-spell',
    component:MySpellComponent,
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
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class MineRoutingModule { }
