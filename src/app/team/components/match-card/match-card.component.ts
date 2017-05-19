import { Component, OnInit, Input } from '@angular/core';
import { TeamMatchVO } from '../../../domain/interface.model';
import { TeamService } from '../../team.service';

@Component({
  selector: 'match-card',
  templateUrl: './match-card.component.html',
  styleUrls: ['./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() matchs;//球队历史赛程
  private defaultTeamIcon: string = this.teamService.defaultTeamIcon;
  constructor(
    private teamService: TeamService
  ) { }
  ngOnInit() {
  }

}
