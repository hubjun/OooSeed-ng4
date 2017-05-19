import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from '../team.service';
import { ToolsService } from '../../shared/tools/tools.service';
import { TeamMatchVO } from '../../domain/interface.model';
import { MatchCardComponent } from '../components/match-card/match-card.component';

@Component({
  selector: 'schedule-channel',
  templateUrl: './schedule-channel.component.html',
  styleUrls: ['./schedule-channel.component.scss']
})
export class ScheduleChannelComponent implements OnInit {
  private currentYear: number;
  private newMatchs: Array<TeamMatchVO> = [];
  private oldMatchs: Array<TeamMatchVO> = [];
  private newMatchTotal: number;
  private oldMatchTotal: number;
  private params: any = {
    teamId: this.teamService.team.id,
    status: null,
    rows: 2
  }
  constructor(
    private teamService: TeamService,
    private toolsService: ToolsService
  ) { }

  ngOnInit() {
    this.currentYear = new Date().getFullYear();
    this.getNewMatchRecord();
    this.getOldMatchRecord();
  }
  //获取球队战绩
  getTeamMatchResult() {
    let params = {
      teamId: this.teamService.team.id,
      mode: 1
    }
    this.teamService.getTeamMatchResult(params).subscribe((res) => {
      if (res.result === '0') {

      }
    })
  }
  //获取球队新赛程
  getNewMatchRecord() {
    this.params.status = '0, 1, 2, 3, 4';
    this.teamService.getTeamMatch(this.params).subscribe((res) => {
      if (res.result === '0') {
        let matchs = res.data.list;
        this.newMatchTotal = res.data.total;
        this.assignDay(matchs).then((result: any) => {
          this.newMatchs = result;
        })
      }
    })
  }
  //获取球队历史赛程
  getOldMatchRecord() {
    this.params.status = -1;
    this.teamService.getTeamMatch(this.params).subscribe((res) => {
      if (res.result === '0') {
        let matchs = res.data.list;
        this.oldMatchTotal = res.data.total;
        this.assignDay(matchs).then((result: any) => {
          this.oldMatchs = result;
        })
      }
    })
  }
  assignDay(matchs) {
    return new Promise((resolve) => {
      let date: Date;
      for (let match of matchs) {
        date = new Date(match.matchTime);
        match = Object.assign(match, {
          "day": date.getDay(),  //比赛当天是周几
          "date": `${date.getMonth() + 1}-${date.getDate()}`//比赛当天是日期
        })
      }
      resolve(matchs);
    })
  }
}
