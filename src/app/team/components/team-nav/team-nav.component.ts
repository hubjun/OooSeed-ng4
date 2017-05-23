import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'team-nav',
  templateUrl: './team-nav.component.html',
  styleUrls: ['./team-nav.component.scss']
})
export class TeamNavComponent implements OnInit {
  private teamId: string;
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.parent.params.subscribe(params => {
      this.teamId = params['teamId']
    })
  }
  switchChannel(channelName: string) {
    this.router.navigate([`/team/${this.teamId}`], { queryParams: { tab: channelName } });
  }
  ngOnInit() {
  }
}
