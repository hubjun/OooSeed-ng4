import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent {
  private match: string[] = [];
  private defaultTeamIcon: string = this.teamService.defaultTeamIcon;
  constructor(
    private teamService: TeamService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe(param => {
      this.getMatchDetail(param['matchId']);
    })
  }
  //获取比赛详情
  getMatchDetail(matchId: number): void {
    let params: object = {
      matchId: matchId
    }
    this.teamService.getMatchDetail(params).subscribe((res) => {
      if (res.result === '0') {
        this.match = res.data;
      }
    })
  }
}
