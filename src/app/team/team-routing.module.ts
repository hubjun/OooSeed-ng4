import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { TeamComponent } from "./team.component";
import { PlayerListComponent } from './team-channel/player-list/player-list.component';
import { PlayerDetailComponent } from './team-channel/player-detail/player-detail.component';
import { MatchRecordComponent } from './schedule-channel/match-record/match-record.component';
import { MatchDetailComponent } from './schedule-channel/match-detail/match-detail.component';
import { TeamChannelComponent } from './team-channel/team-channel.component';
import { FansChannelComponent } from './fans-channel/fans-channel.component';
import { ScheduleChannelComponent } from './schedule-channel/schedule-channel.component';

const routes: Routes = [
  {
    path: '',
    component: TeamComponent,
    children: [
      {
        path: '',
        redirectTo: 'info',
        pathMatch: 'full'
      },
      {
        path: 'info',
        component: TeamChannelComponent
      },
      {
        path: 'schedule',
        component: ScheduleChannelComponent
      },
      {
        path: 'fans',
        component: FansChannelComponent
      }
    ]
  },
  {
    path: 'players',
    component: PlayerListComponent
  },
  {
    path: 'player/:playerId',
    component: PlayerDetailComponent
  },
  {
    path: 'match-record',
    component: MatchRecordComponent
  },
  {
    path: 'match/:matchId',
    component: MatchDetailComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TeamRoutingModule { }
