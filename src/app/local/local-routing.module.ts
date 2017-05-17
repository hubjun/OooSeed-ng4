import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LocalComponent } from "./local.component";
import { LocalSpellComponent } from "./local-spell/local-spell.component";
import { LocalTeamComponent } from "./local-team/local-team.component";
import { LocalSpellDetailComponent } from "./local-spell-detail/local-spell-detail.component";
import { LocalPersonComponent } from "./local-person/local-person.component";
import { LocalRecruitComponent } from "./local-recruit/local-recruit.component";
import { LocalRecruitDetailComponent } from "./local-recruit-detail/local-recruit-detail.component";
import { LocalMatchComponent } from "./local-match/local-match.component";
import { LocalCityComponent } from './local-city/local-city.component';
import { MatchDetailComponent } from './local-match/match-detail/match-detail.component';
import {HomepageComponent} from "../homepage/homepage.component";

const routes: Routes = [
  {
    path: '',
    component: LocalComponent,
    children: [
      {
        path: '',
        redirectTo: 'spell-ball',
        pathMatch: 'full'
      },
      {
        path: 'spell-ball',
        component: LocalSpellComponent
      },
      {
        path: 'booking-match',
        component: LocalMatchComponent
      },
      {
        path: 'team-ip',
        component: LocalTeamComponent
      },
      {
        path: 'personal-ip',
        component: LocalPersonComponent
      },
      {
        path: 'recruit',
        component: LocalRecruitComponent
      }
    ]
  },
  {
    path: 'spell-detail/:fightId',
    component: LocalSpellDetailComponent
  },
  {
    path: 'booking-match/:matchId',
    component: MatchDetailComponent
  },
  {
    path: 'recruit-detail/:recruitId',
    component: LocalRecruitDetailComponent
  },
  {
    path: 'citys',
    component: LocalCityComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LocalRoutingModule { }
