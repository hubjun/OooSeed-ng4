import {NgModule} from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {TeamRoutingModule} from "./team-routing.module";
import {TeamComponent} from "./team.component";
import {TeamService} from "./team.service";
import { TeamNavComponent } from './components/team-nav/team-nav.component';
import { TeamCardComponent } from './components/team-card/team-card.component';
import { TeamChannelComponent } from './team-channel/team-channel.component';


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
  ],
  providers:[TeamService]
})
export class TeamModule { }
