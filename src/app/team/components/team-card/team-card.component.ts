import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TeamService } from '../../team.service';
import { Subscription } from 'rxjs';
import { FootballTeam } from '../../../domain/interface.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent {
  private subscription: Subscription = new Subscription();
  private basicInfo: FootballTeam | any;
  private defaultTeamIcon: string = this.teamService.defaultTeamIcon;

  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {
    this.subscription.add(
      this.route.params.subscribe(params => {
        this.getTeamBasicInfo(params['teamId']);
      })
    )
  }
  /** 
   * 获取球队基本信息
   */
  getTeamBasicInfo(teamId: string): void {
    this.subscription.add(
      this.teamService.getTeamBasicInfo(teamId).subscribe(res => {
        if (res.result === '0' && res.data) {
          this.basicInfo = res.data;
        }
      })
    )
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
