import { Component, OnInit, Input, ViewChild, ContentChild } from '@angular/core';
import { TeamService } from '../team.service';
import { FootballTeam } from '../../domain/interface.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SeasonResultsComponent } from '../components/season-results/season-results.component';

@Component({
  selector: 'team-channel',
  templateUrl: './team-channel.component.html',
  styleUrls: ['./team-channel.component.scss']
})
export class TeamChannelComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private teamId: string;
  private basicInfo: FootballTeam | any;
  private result: number[] = []; //球队战绩
  private players: Array<string> = [];//球队球员
  private scrollContainer: Element;
  private defaultUserIcon: string = this.teamService.defaultUserIcon;
  @ViewChild(SeasonResultsComponent) seasonResults: SeasonResultsComponent;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => {
      this.teamId = params['teamId']
    })
  }
  //获取球队基本信息
  getTeamBasicInfo(): void {
    this.subscription.add(
      this.teamService.getTeamBasicInfo(this.teamId).subscribe(res => {
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

