import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'video-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {

  @Input() listObj: any[];
  @Output() change = new EventEmitter();
  constructor(
    private router:Router
  ) { }

  gotoDetail(e,id){
    // debugger
    console.log(id);
    this.router.navigate(['/videos/detail'], {queryParams: {videoID: id, cateID: ''}});
  };

  ngOnInit() {
  }

}
