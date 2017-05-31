import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../../shared/tools/tools.service';

@Component({
  selector: 'match-record',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './match-record.component.html',
  styleUrls: ['./match-record.component.scss']
})
export class MatchRecordComponent {
  public matchs: Array<any> = [];
  public title: string;
  constructor(
    public teamService: TeamService,
    public toolsService: ToolsService,
    public route: ActivatedRoute
  ) {

    this.route.queryParams.subscribe(params => {
      this.getTeamMatch(params['type']);
      if (params.type == 'over') {
        this.title = '历史赛程';
      }
      else {
        this.title = '下一场比赛';
      }
    })
  }
  //获取所有球队赛程
  getTeamMatch(type: string): void {
    this.toolsService.showLoading();
    let teamId: string;
    this.route.parent.params.subscribe(params => {
      teamId = params['teamId']
    })
    let params = {
      teamId: teamId,
      status: null
    }
    type == 'over' ? params.status = -1 : params.status = '0, 1, 2, 3, 4';
    this.teamService.getTeamMatch(params).subscribe((res) => {
      this.toolsService.hideLoading();
      if (res.result === '0') {
        let matchs: Array<any> = res.data.list;
        let date: Date;
        for (let match of matchs) {
          date = new Date(match.matchTime);
          match = Object.assign(match, {
            "day": date.getDay(),  //比赛当天是周几
            "date": `${date.getMonth() + 1}-${date.getDate()}`//比赛当天是日期
          })
        }
        this.matchs = matchs;
      }
    })
  }
}
