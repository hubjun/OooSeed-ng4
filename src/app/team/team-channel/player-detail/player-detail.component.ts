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
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe(param => {
      this.getTeamPlayerDetail(param.playerId);
      this.getUserInfo(param.playerId)
    })
  }

  //获取球队球员在球队信息
  getTeamPlayerDetail(playerId: string) {
    let params: object = {
      teamId: this.teamService.team.id,
      playerId: playerId
    }
    this.teamService.getTeamPlayerDetail(params).subscribe((res) => {
      if (res.result === '0') {
        this.player = res.data;
      }
    })
  }
  //获取球队球员个人信息
  getUserInfo(userId: string) {
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
