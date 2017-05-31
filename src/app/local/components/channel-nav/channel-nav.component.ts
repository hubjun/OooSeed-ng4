import { Component, OnInit,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'channel-nav',
  templateUrl: 'channel-nav.component.html',
  styleUrls: ['./channel-nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChannelNavComponent implements OnInit {
  public navs: Array<object> = [
    {
      "id": 1,
      "icon": "tchome_spell.png",
      "text": "拼球",
      "value": "spellBall",
      "link": "spell-ball"
    },
    {
      "id": 2,
      "icon": "tchome_about.png",
      "text": "约战",
      "value": "bookingMatch",
      "link": "booking-match"
    },
    {
      "id": 3,
      "icon": "tchome_team.png",
      "text": "球队",
      "value": "teamIp",
      "link": "team-ip"
    },
    {
      "id": 4,
      "icon": "tchome_recruiting.png",
      "text": "招募球员",
      "value": "recruit",
      "link": "recruit"
    },
    {
      "id": 5,
      "icon": "tchome_push.png",
      "text": "推荐用户",
      "value": "personalIp",
      "link": "personal-ip"
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
