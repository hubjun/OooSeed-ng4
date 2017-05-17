import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { TeamService } from '../team.service';

@Component({
  selector: 'team-channel',
  templateUrl: './team-channel.component.html',
  styleUrls: ['./team-channel.component.scss']
})
export class TeamChannelComponent implements OnInit {


  // @ViewChild(MatchResultComponent) matchResultCompoent: MatchResultComponent;
  @Input() basicInfo;//球队基本信息
  players: Array<string> = [];//球队球员
  result: number[] = []; //球队战绩

  constructor(
    private teamService: TeamService
  ) { }
  ngOnInit() {
    this.getTeamMatchResult();
    this.getTeamPlayer();
  }

  //获取球队球员
  getTeamPlayer(): void {
    let params: any = {
      // id: this.navParams.get('id'),
      rows: 5
    }
    // this.teamService.getTeamPlayer(params).subscribe((res) => {
    //   // console.log(res.data.list)
    //   if (res.result === '0') {
    //     this.players = res.data.list;
    //   }
    // })
  }
  //获取球队战绩
  getTeamMatchResult(): void {
    let params = {
      // teamId: this.navParams.get('id'),
      mode: 2,
      dataSize: 10
    }
    // this.teamService.getTeamMatchResult(params).subscribe((res) => {
    //   if (res.result === '0') {
    //     this.matchResultCompoent.setPercent(res.data);
    //   }
    // })
  }
  //前往球队阵容列表
  goTeamPlayer(): void {
    // this.navCtrl.push(TeamPlayerPage, {
    //   id: this.navParams.get('id')
    // })
  }
  //前往球员详情
  goTeamPlayerDetail(player: any): void {
    // this.navCtrl.push(TeamPlayerDetailPage, {
    //   teamId: player.teamId,
    //   playerId: player.userId
    // })
  }
}
