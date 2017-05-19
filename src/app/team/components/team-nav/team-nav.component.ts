import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'team-nav',
  templateUrl: './team-nav.component.html',
  styleUrls: ['./team-nav.component.scss']
})
export class TeamNavComponent implements OnInit {
  public navs: Array<object> = [
    {
      "id": 1,
      "text": "球队",
      "link": "info"
    },
    {
      "id": 2,
      "text": "赛程",
      "link": "schedule"
    },
    {
      "id": 3,
      "text": "粉丝",
      "link": "fans"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
