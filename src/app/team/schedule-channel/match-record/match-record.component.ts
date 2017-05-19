import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'seed-match-record',
  templateUrl: './match-record.component.html',
  styleUrls: ['./match-record.component.scss']
})
export class MatchRecordComponent {
  private matchs: Array<any> = [];
  constructor(
    private teamService: TeamService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe(param => {
      this.getTeamMatch(param.type, param.teamId);
    })
  }
  //获取所有球队赛程
  getTeamMatch(type: string, teamId: number) {
    let params = {
      teamId: teamId,
      status: null
    }
    type == 'over' ? params.status = -1 : params.status = '0, 1, 2, 3, 4';
    this.teamService.getTeamMatch(params).subscribe((res) => {
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
