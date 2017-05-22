import { Component, OnInit } from '@angular/core';
import { TeamService } from './team.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent {
  constructor(
    private router: ActivatedRoute,
    private teamService: TeamService
  ) {
 
  }
}
