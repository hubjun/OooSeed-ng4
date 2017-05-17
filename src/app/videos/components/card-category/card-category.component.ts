import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'video-card-category',
  templateUrl: './card-category.component.html',
  styleUrls: ['./card-category.component.scss']
})
export class CardCategoryComponent implements OnInit {
  @Input() tvCateObj: any[];
  @Output() cate = new EventEmitter();
  constructor(
    private router: Router,
    private activeRouter: ActivatedRoute,
  ) { }

  toggleCateMore(e,cateId){
    this.cate.emit(cateId);
  };

  goDetail(videoId,cateId){
    this.router.navigate(['/videos/detail'], {queryParams: {videoID: videoId, cateID: cateId}});
  };

  ngOnInit() {
  }

  // goDetail(v,l){
  //   this.router.navigate(['video-details'],{queryParams: {videoId: l.videoId,cateId: v.cateId}})
  // };

}
