import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TeamService } from '../../team.service';
import { Subscription } from 'rxjs';
import { FootballTeam } from '../../../domain/interface.model';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private basicInfo: FootballTeam;
  private defaultTeamIcon: string = this.teamService.defaultTeamIcon;

  constructor(
    private teamService: TeamService,
    private router: ActivatedRoute
  ) {
    this.subscription.add(
      this.router.params.subscribe(param => {
        this.teamService.team.id = param.teamId;
        this.teamService.getTeamBasicInfo(param.teamId);
      })
    )
    this.subscription.add(
      this.teamService.basicInfo.subscribe((result) => {
        this.basicInfo = result;
        this.teamService.team.orgUser = result.orgUser;
      })
    )
  }

  ngOnInit() {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
