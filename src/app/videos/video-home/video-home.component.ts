import {Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {VideosService} from '../videos.service';
import {ToolsService} from '../../shared/tools/tools.service';
import {Router, ActivatedRoute} from '@angular/router'
import {AppPlayTurn} from "../../domain/interface.model";


@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VideoHomeComponent implements OnInit {
  public bannerObj : AppPlayTurn[];
  index:number = 0;
  isSlidersActive:number = 0;
  example1SwipeOptions: any;
  cateObj: any[] = [];
  // listObj: any[] = [];

  constructor(
    public videoService: VideosService,
    public router: Router,
    public tools: ToolsService,
  ) {
    this.tools.setTitle('视频');
  }

  goVdetail(resId){
    this.router.navigate(['/videos/detail'], {queryParams: {videoID: resId, cateID: ''}});
  };


  topCateMore(e,cateId){
    this.router.navigate(['/videos/more', cateId]);
  };

  getSliderList(){
    this.videoService.getSlider()
      .subscribe(rs => {
        if(rs.result === '0'){
          this.bannerObj = rs.data.list;
        }else {
          return;
        }
      })
  };

  getCateListInfo(){
    this.tools.showLoading();
    this.videoService.getCateList()
      .subscribe(rs => {
        if(rs.result === '0'){
          this.cateObj = rs.data;
          setTimeout(() => {
            this.setCateWidth();
          })
        }
      })
    this.tools.hideLoading();
  };

  setCateWidth(){
    let ul = document.getElementsByClassName('category-ul')[0];
    let ele = ul.getElementsByTagName('li');
    let totals: number = 0;
    for(let i = 0; i < ele.length; i++){
      totals += ele[i].offsetWidth;
    }
    let ss = document.getElementById('category-ul');
    ss.style.width = totals + 'px';
    // console.log(ss);
  };

  ngOnInit() {
    this.getSliderList();
    this.getCateListInfo();
  }

}
