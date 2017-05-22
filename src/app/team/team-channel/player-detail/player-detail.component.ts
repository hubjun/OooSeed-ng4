import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent {
  player: string[] = [];
  user: string[] = [];
  private defaultUserIcon: string = this.teamService.defaultUserIcon;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      this.getTeamPlayerDetail(params['teamId'], params['playerId']);
      this.getUserInfo(params['playerId'])
    })
  }

  //获取球队球员在球队信息
  getTeamPlayerDetail(teamId: string, playerId: string): void {
    let params: object = {
      teamId: teamId,
      playerId: playerId
    }
    this.teamService.getTeamPlayerDetail(params).subscribe((res) => {
      if (res.result === '0') {
        this.player = res.data;
      }
    })
  }
  //获取球队球员个人信息
  getUserInfo(userId: string): void {
    let param: object = {
      userId: userId
    }
    this.teamService.getUserInfo(param).subscribe((res) => {
      if (res.result === '0') {
        this.user = res.data;
      }
    })
  }
}
