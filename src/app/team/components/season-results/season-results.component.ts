import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'season-results',
  templateUrl: './season-results.component.html',
  styleUrls: ['./season-results.component.scss']
})
export class SeasonResultsComponent implements OnInit {
  private result
  constructor(
    private teamService: TeamService
  ) { }
  //获取球队战绩
  getTeamMatchResult(): void {
    let params = {
      teamId: this.teamService.team.id,
      mode: 2,
      dataSize: 10
    }
    this.teamService.getTeamMatchResult(params).subscribe((res) => {
      if (res.result === '0' && res.data) {
        this.result = res.data
      }
    })
  }
  ngOnInit() {
    this.getTeamMatchResult()
  }
}
