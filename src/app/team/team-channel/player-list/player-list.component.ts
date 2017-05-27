import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../../shared/tools/tools.service';
import { TeamPlayerVO } from '../../../domain/interface.model';

@Component({
  selector: 'player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent {
  public players: Array<TeamPlayerVO>=[];
  public scrollContainer: Element;
  constructor(
    public teamService: TeamService,
    public toolsService: ToolsService,
    public route: ActivatedRoute
  ) {

    this.route.params.subscribe(params => {
      this.getTeamPlayer(params['teamId']);
    })
  }
  //获取球队球员
  getTeamPlayer(teamId: number): void {
    this.toolsService.showLoading();
    let params: object = {
      id: teamId
    }
    this.teamService.getTeamPlayer(params).subscribe((res) => {
      this.toolsService.hideLoading();
      if (res.result === '0') {
        this.players = res.data.list;
      }
    })
  }
  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
