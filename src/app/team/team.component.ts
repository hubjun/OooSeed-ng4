import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent{
  
  constructor(
    private teamService: TeamService
  ) { }
}
