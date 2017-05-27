import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { FootballTeam } from '../domain/interface.model';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  public currentChannel: string = 'teamChannel';
  public basicInfo: FootballTeam;
  public defaultTeamIcon: string = this.teamService.defaultTeamIcon;
  public ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public teamService: TeamService
  ) {
    this.route.params.takeUntil(this.ngUnsubscribe).subscribe(params => {
      this.getTeamBasicInfo(params['teamId']);
    })
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: any) => {
      this.currentChannel = this.teamService.currentChannel;
    })
  }
  /**
   * 获取球队基本信息
   * @param teamId ：球队ID
   */
  getTeamBasicInfo(teamId: string): void {
    this.teamService.getTeamBasicInfo(teamId).takeUntil(this.ngUnsubscribe).subscribe(res => {
      if (res.result === '0' && res.data) {
        this.basicInfo = res.data;
      }
    })
  }
  /**
   * 切换栏目
   * @param e ：event
   */
  switchChannel(e): void {
    console.log(e)
    let currentChannel = e.target.getAttribute('data-channel');
    if (currentChannel != null) {
      this.teamService.currentChannel = currentChannel;
      this.currentChannel = e.target.getAttribute('data-channel');
    }
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
