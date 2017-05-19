import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'member-module',
  templateUrl: './member-module.component.html',
  styleUrls: ['./member-module.component.scss']
})
export class MemberModuleComponent implements OnInit {
  @Input() members;
  private defaultUserIcon: string = this.teamService.defaultUserIcon;
  private defaultTeamIcon: string = this.teamService.defaultTeamIcon;
  constructor(
    private teamService:TeamService
  ) { }

  ngOnInit() {
  }

}
