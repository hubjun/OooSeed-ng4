import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../../shared/tools/tools.service';
import { TeamMatchVO } from '../../../domain/interface.model';

@Component({
  selector: 'match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['../../components/match-card/match-card.component.scss', '../../../local/local-match/match-detail/match-detail.component.scss']
})
export class MatchDetailComponent {
  public match:TeamMatchVO;
  public defaultTeamIcon: string = this.teamService.defaultTeamIcon;
  constructor(
    public teamService: TeamService,
    public toolsService: ToolsService,
    public router: ActivatedRoute
  ) {
    this.router.params.subscribe(param => {
      this.getMatchDetail(param['matchId']);
    })
  }
  //获取比赛详情
  getMatchDetail(matchId: number): void {
    this.toolsService.showLoading();
    this.teamService.getMatchDetail(matchId).subscribe((res) => {
      this.toolsService.hideLoading();
      if (res.result === '0') {
        this.match = res.data;
      }
    })
  }
}
