import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {TeamRoutingModule} from "./team-routing.module";
import {TeamComponent} from "./team.component";
import {TeamService} from "./team.service";
import { TeamNavComponent } from './components/team-nav/team-nav.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { TeamChannelComponent } from './team-channel/team-channel.component';
import { SeasonResultsComponent } from './components/season-results/season-results.component';
import { ScheduleChannelComponent } from './schedule-channel/schedule-channel.component';
import { FansChannelComponent } from './fans-channel/fans-channel.component';
import { MatchCardComponent } from './components/match-card/match-card.component';
import { MemberModuleComponent } from './components/member-module/member-module.component';
import { PlayerListComponent } from './team-channel/player-list/player-list.component';
import { PlayerDetailComponent } from './team-channel/player-detail/player-detail.component';
import { MatchRecordComponent } from './schedule-channel/match-record/match-record.component';
import { MatchDetailComponent } from './schedule-channel/match-detail/match-detail.component';
import { CircularProgressComponent } from './components/circular-progress/circular-progress.component';


@NgModule({
  imports: [
    SharedModule,
    TeamRoutingModule
  ],
  declarations: [
    TeamComponent,
    TeamNavComponent,
    TeamCardComponent,
    TeamChannelComponent,
    SeasonResultsComponent,
    ScheduleChannelComponent,
    FansChannelComponent,
    MatchCardComponent,
    MemberModuleComponent,
    PlayerListComponent,
    PlayerDetailComponent,
    MatchRecordComponent,
    MatchDetailComponent,
    CircularProgressComponent,
  ],
  providers:[TeamService]
})
export class TeamModule { }
