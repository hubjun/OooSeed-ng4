import { Component, OnInit, Input, ViewChild, ContentChild, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../team.service';
import { FootballTeam, TeamPlayerVO } from '../../domain/interface.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonResultsComponent } from '../components/season-results/season-results.component';
import { ToolsService } from '../../shared/tools/tools.service';

@Component({
  selector: 'team-channel',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './team-channel.component.html',
  styleUrls: ['./team-channel.component.scss']
})
export class TeamChannelComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  public teamId: string;
  public basicInfo: FootballTeam;
  public players: Array<TeamPlayerVO> = [];//球队球员
  public scrollContainer: Element;
  public defaultUserIcon: string = this.teamService.defaultUserIcon;
  @ViewChild(SeasonResultsComponent) seasonResults: SeasonResultsComponent;
  constructor(
    public teamService: TeamService,
    public route: ActivatedRoute,
    public toolsService: ToolsService
  ) {
    this.route.parent.params.subscribe(params => {
      this.teamId = params['teamId']
    })
  }
  //获取球队基本信息
  getTeamBasicInfo(): void {
    this.toolsService.showLoading();
    this.subscription.add(
      this.teamService.getTeamBasicInfo(this.teamId).subscribe(res => {
        this.toolsService.hideLoading();
        if (res.result === '0' && res.data) {
          this.basicInfo = res.data;
        }
      })
    )
  }
  //获取球队战绩
  getTeamMatchResult(): void {
    let params = {
      teamId: this.teamId,
      mode: 2,
      dataSize: 10
    }
    this.subscription.add(
      this.teamService.getTeamMatchResult(params).subscribe((res) => {
        if (res.result === '0' && res.data) {
          this.seasonResults.setPercent(res.data);
        }
      })
    )
  }
  //获取球队球员
  getTeamPlayer(): void {
    let params: object = {
      id: this.teamId,
      rows: 5
    }
    this.subscription.add(
      this.teamService.getTeamPlayer(params).subscribe((res) => {
        if (res.result === '0' && res.data) {
          this.players = res.data.list;
        }
      })
    )
  }
  ngOnInit() {
    this.getTeamBasicInfo();
    this.getTeamMatchResult();
    this.getTeamPlayer();
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

