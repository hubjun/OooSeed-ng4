import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team.service';
import { UserInfoVO, FootballTeam } from '../../domain/interface.model';

@Component({
  selector: 'fans-channel',
  templateUrl: './fans-channel.component.html',
  styleUrls: ['./fans-channel.component.scss']
})
export class FansChannelComponent implements OnInit {
  private follow: Array<UserInfoVO>;
  private fans: Array<UserInfoVO>;
  private basicInfo: FootballTeam;

  private params = {
    userId: this.teamService.team.orgUser,
    rows: 8
  }
  constructor(
    private teamService: TeamService
  ) {
    // this.teamService.basicInfo.subscribe((result) => {
    //   this.basicInfo = result;
    //   console.log(result)
    // })
  }

  //获取球队关注列表
  getTeamFollow() {
    this.teamService.getFollow(this.params).subscribe((res) => {
      if (res.result === '0') {
        let follow = res.data
        Object.assign(follow, {
          "type": "follow"
        })
        this.follow = follow;

      }
    })
  }
  //获取球队粉丝列表
  getTeamFans() {
    this.teamService.getFans(this.params).subscribe((res) => {
      if (res.result === '0') {
        let fans = res.data
        Object.assign(fans, {
          "type": "fans"
        })
        this.fans = fans;
      }
    })
  }
  ngOnInit() {
    this.getTeamFollow();
    this.getTeamFans();
  }
}
