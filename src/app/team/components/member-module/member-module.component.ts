import { Component, OnInit, Input } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'member-module',
  templateUrl: './member-module.component.html',
  styleUrls: ['./member-module.component.scss']
})
export class MemberModuleComponent implements OnInit {
  @Input() members;
  private scrollContainer: Element;
  constructor(
    private teamService: TeamService
  ) { }
  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
