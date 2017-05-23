import { Component, OnInit, ViewChild } from '@angular/core';
import { TeamService } from '../team.service';
import { ToolsService } from '../../shared/tools/tools.service';
import { TeamMatchVO } from '../../domain/interface.model';
import { MatchCardComponent } from '../components/match-card/match-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonResultsComponent } from '../components/season-results/season-results.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'schedule-channel',
  templateUrl: './schedule-channel.component.html',
  styleUrls: ['./schedule-channel.component.scss']
})
export class ScheduleChannelComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private currentYear: number = new Date().getFullYear();
  private newMatchs: Array<TeamMatchVO> = [];
  private oldMatchs: Array<TeamMatchVO> = [];
  private newMatchTotal: number;
  private oldMatchTotal: number;
  private params: any = {
    teamId: null,
    status: null,
    rows: 2
  }
  @ViewChild(SeasonResultsComponent) seasonResults: SeasonResultsComponent;

  constructor(
    private teamService: TeamService,
    private toolsService: ToolsService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.parent.params.subscribe(params => {
      this.params.teamId = params['teamId']
    })
  }


  //获取球队战绩
  getTeamMatchResult(): void {
    this.toolsService.showLoading();
    let params = {
      teamId: this.params.teamId,
      mode: 1
    }
    this.subscription.add(
      this.teamService.getTeamMatchResult(params).subscribe((res) => {
        this.toolsService.hideLoading();
        if (res.result === '0' && res.data) {
          this.seasonResults.setPercent(res.data);
        }
      })
    )
  }
  //获取球队新赛程
  getNewMatchRecord(): void {
    this.params.status = '0, 1, 2, 3, 4';
    this.subscription.add(
      this.teamService.getTeamMatch(this.params).subscribe((res) => {
        if (res.result === '0' && res.data) {
          let matchs = res.data.list;
          this.newMatchTotal = res.data.total;
          this.assignDay(matchs).then((result: any) => {
            this.newMatchs = result;
          })
        }
      })
    )
  }
  //获取球队历史赛程
  getOldMatchRecord(): void {
    this.params.status = -1;
    this.subscription.add(
      this.teamService.getTeamMatch(this.params).subscribe((res) => {
        if (res.result === '0' && res.data) {
          let matchs = res.data.list;
          this.oldMatchTotal = res.data.total;
          this.assignDay(matchs).then((result: any) => {
            this.oldMatchs = result;
          })
        }
      })
    )
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
  goToMatchRecordPage(type: string) {
    this.router.navigate([`/team/${this.params.teamId}/match-record`], { queryParams: { type: type } });
  }
  ngOnInit() {
    this.getTeamMatchResult();
    this.getNewMatchRecord();
    this.getOldMatchRecord();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
