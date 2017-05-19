import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  private players: Array<string> = [];
  private defaultUserIcon: string = this.teamService.defaultUserIcon;
  constructor(
    private teamService: TeamService,
    private router: ActivatedRoute
  ) {
    this.router.params.subscribe(param => {
      this.getTeamPlayer(param.teamId);
    })
  }
  //获取球队球员
  getTeamPlayer(teamId: number) {
    let params: object = {
      id: teamId
    }
    this.teamService.getTeamPlayer(params).subscribe((res) => {
      if (res.result === '0') {
        this.players = res.data.list;
      }
    })
  }
}
