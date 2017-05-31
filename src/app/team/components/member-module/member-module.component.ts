import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TeamService } from '../../team.service';

@Component({
  selector: 'member-module',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './member-module.component.html',
  styleUrls: ['./member-module.component.scss']
})
export class MemberModuleComponent implements OnInit {
  @Input() members;
  public scrollContainer: Element;
  constructor(
    public teamService: TeamService
  ) { }
  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
