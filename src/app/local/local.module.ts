import { NgModule } from '@angular/core';
import {SharedModule} from "../shared/shared.module";
import {LocalRoutingModule} from "./local-routing.module";
import {LocalComponent} from "./local.component";
import {LocalService} from "./local.service";
import {ChannelNavComponent } from './components/channel-nav/channel-nav.component';
import {ChannelFilterComponent } from './components/channel-filter/channel-filter.component';
import {LocalSpellComponent} from "./local-spell/local-spell.component";
import {LocalTeamComponent} from "./local-team/local-team.component";
import { LocalSpellDetailComponent } from './local-spell-detail/local-spell-detail.component';
import {LocalPersonComponent} from "./local-person/local-person.component";
import {LocalRecruitComponent} from "./local-recruit/local-recruit.component";
import {LocalRecruitDetailComponent} from "./local-recruit-detail/local-recruit-detail.component";
import { LocalMatchComponent } from './local-match/local-match.component';
import { LocalCityComponent } from './local-city/local-city.component';
import { MatchDetailComponent } from './local-match/match-detail/match-detail.component';
import {HomepageComponent} from "../homepage/homepage.component";

@NgModule({
  imports: [
    SharedModule,
    LocalRoutingModule,
  ],
  declarations: [
    LocalComponent,
    ChannelNavComponent,
    ChannelFilterComponent,
    LocalSpellComponent,
    LocalTeamComponent,
    LocalSpellDetailComponent,
    LocalTeamComponent,
    LocalPersonComponent,
    LocalRecruitComponent,
    LocalMatchComponent,
    LocalRecruitDetailComponent,
    LocalMatchComponent,
    LocalCityComponent,
    MatchDetailComponent,
  ],
  providers:[LocalService]
})
export class LocalModule { }
