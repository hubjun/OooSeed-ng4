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
  private scrollContainer:Element;
  constructor(
    private teamService: TeamService,
    private route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => {
      this.getTeamPlayer(params['teamId']);
    })
  }
  //获取球队球员
  getTeamPlayer(teamId: number): void {
    let params: object = {
      id: teamId
    }
    this.teamService.getTeamPlayer(params).subscribe((res) => {
      if (res.result === '0') {
        this.players = res.data.list;
      }
    })
  }
  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
