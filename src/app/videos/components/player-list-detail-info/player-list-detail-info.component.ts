import {
  Component, OnInit, Input, ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'video-player-list-detail-info',
  templateUrl: './player-list-detail-info.component.html',
  styleUrls: ['./player-list-detail-info.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class PlayerListDetailInfoComponent implements OnInit {
  @Input() moreObj: any[];
  // @Output() cate = new EventEmitter();
  constructor(
    public router: Router
  ) { }

  goMoreDetail(e,id,cateID,videoCover){
    this.router.navigate(['/videos/detail'], {queryParams: {videoID: id, cateID: cateID, videoCover: videoCover}});
  };

  ngOnInit() {
  }

}
