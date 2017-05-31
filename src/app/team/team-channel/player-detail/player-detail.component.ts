import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../../team.service';
import { ActivatedRoute } from '@angular/router';
import { ToolsService } from '../../../shared/tools/tools.service';
import { TeamPlayerVO, UserInfoVO } from '../../../domain/interface.model';

@Component({
  selector: 'player-detail',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent {
  public player: TeamPlayerVO;
  public user: UserInfoVO;
  public defaultUserIcon: string = this.teamService.defaultUserIcon;
  constructor(
    public teamService: TeamService,
    public toolsService: ToolsService,
    public route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      let paramsObj: object = {
        teamId: params['teamId'],
        playerId: params['playerId']
      }
      this.getTeamPlayerDetail(paramsObj);
      this.getUserInfo(params['playerId'])
    })
  }

  //获取球队球员在球队信息
  getTeamPlayerDetail(params: object): void {
    this.toolsService.showLoading();
    this.teamService.getTeamPlayerDetail(params).subscribe((res) => {
      this.toolsService.hideLoading();
      if (res.result === '0' && res.data) {
        this.player = res.data;
      }
    })
  }
  //获取球队球员个人信息
  getUserInfo(userId: string): void {
    this.teamService.getUserInfo(userId).subscribe((res) => {
      if (res.result === '0' && res.data) {
        this.user = res.data;
      }
    })
  }
}
