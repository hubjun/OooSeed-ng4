import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'video-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input() listObj: any[];
  // @Output() change = new EventEmitter();
  @Input() cateID: number;
  // @Output() toggleList = new EventEmitter();
  constructor(
    public router:Router
  ) { }

  toggleDetail(e,id,videoCover){
    // debugger
    // console.log(id);
    this.router.navigate(['/videos/detail'], {queryParams: {videoID: id, cateID: this.cateID, videoCover: videoCover}});
  };

  ngOnInit() {
  }

}
