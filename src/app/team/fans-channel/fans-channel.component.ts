import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../team.service';
import { UserInfoVO, FootballTeam } from '../../domain/interface.model';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToolsService } from '../../shared/tools/tools.service';

@Component({
  selector: 'fans-channel',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './fans-channel.component.html',
  styleUrls: ['./fans-channel.component.scss']
})
export class FansChannelComponent {
  public subscription: Subscription = new Subscription();
  public follow: Array<UserInfoVO> = [];
  public fans: Array<UserInfoVO> = [];
  public params = {
    userId: null,
    rows: 8
  }
  constructor(
    public teamService: TeamService,
    public toolsService: ToolsService,
    public route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe(params => {
      this.getTeamBasicInfo(params['teamId']);
    })
  }
  //获取球队基本信息
  getTeamBasicInfo(teamId: string): void {
    this.toolsService.showLoading();
    this.subscription.add(
      this.teamService.getTeamBasicInfo(teamId).subscribe(res => {
        this.toolsService.hideLoading();
        if (res.result === '0' && res.data) {
          this.params.userId = res.data.orgUser;
          this.getTeamFollow();
          this.getTeamFans();
        }
      })
    )
  }

  //获取球队关注列表
  getTeamFollow(): void {
    this.subscription.add(
      this.teamService.getFollow(this.params).subscribe((res) => {
        if (res.result === '0' && res.data) {
          let follow = res.data
          Object.assign(follow, {
            "type": "follow"
          })
          this.follow = follow;
        }
      })
    )
  }
  //获取球队粉丝列表
  getTeamFans(): void {
    this.subscription.add(
      this.teamService.getFans(this.params).subscribe((res) => {
        if (res.result === '0' && res.data) {
          let fans = res.data
          Object.assign(fans, {
            "type": "fans"
          })
          this.fans = fans;
        }
      })
    )
  }
}
