import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TeamMatchVO } from '../../../domain/interface.model';
import { TeamService } from '../../team.service';

@Component({
  selector: 'match-card',
  encapsulation:ViewEncapsulation.None,
  templateUrl: './match-card.component.html',
  styleUrls: ['../../../local/local-match/match-detail/match-detail.component.scss','./match-card.component.scss']
})
export class MatchCardComponent implements OnInit {
  @Input() matchs;//球队历史赛程
  public scrollContainer: Element;

  constructor(
    public teamService: TeamService
  ) { }
  ngOnInit() {
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
}
