import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'video-player-list-detail-info',
  templateUrl: './player-list-detail-info.component.html',
  styleUrls: ['./player-list-detail-info.component.scss']
})
export class PlayerListDetailInfoComponent implements OnInit {
  @Input() moreObj: any[];
  @Output() cate = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
