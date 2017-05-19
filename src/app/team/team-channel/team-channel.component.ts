import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TeamService } from '../team.service';
import { FootballTeam } from '../../domain/interface.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'team-channel',
  templateUrl: './team-channel.component.html',
  styleUrls: ['./team-channel.component.scss']
})
export class TeamChannelComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  private basicInfo: FootballTeam|any = this.teamService.basicInfo;
  players: Array<string> = [];//球队球员
  result: number[] = []; //球队战绩
  private defaultUserIcon: string = this.teamService.defaultUserIcon;
  constructor(
    private teamService: TeamService,
    private router: ActivatedRoute
  ) { }
  //获取球队球员
  getTeamPlayer(teamId: number): void {
    let params: object = {
      id: teamId,
      rows: 5
    }
    this.teamService.getTeamPlayer(params).subscribe((res) => {
      if (res.result === '0') {
        this.players = res.data.list;
      }
    })
  }
  ngOnInit() {
    this.getTeamPlayer(this.teamService.team.id);
  }
}
