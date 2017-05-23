import { Component, OnInit, ElementRef ,ViewChild} from '@angular/core';
import {VideosService} from '../videos.service';
import {ToolsService} from '../../shared/tools/tools.service';
import {Observable, Subject} from "rxjs";
import {Router, ActivatedRoute} from '@angular/router'
import {AppPlayTurn,catePart} from "../../domain/interface.model";
import {KSSwiperContainer} from "angular2-swiper";
// import {childOfKind} from "tslint";
// import {count} from "rxjs/operator/count";

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.scss']
})
export class VideoHomeComponent implements OnInit {
  public bannerObj : Observable<AppPlayTurn[]>;
  // public cateObj: Observable<catePart[]>;
  index:number = 0;
  isSlidersActive:number = 0;
  @ViewChild(KSSwiperContainer) swiperContainer: KSSwiperContainer;
  example1SwipeOptions: any;
  cateObj: any[] = [];
  // listObj: any[] = [];

  constructor(
    private videoService: VideosService,
    private router: Router,
    private tools: ToolsService,
    private activeRoute: ActivatedRoute,
    public el:ElementRef
  ) {
    // this.bannerObj = videoService.banners;
    // console.log(this.bannerObj);
    // this.cateObj = videoService.cate;
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
          console.log(this.bannerObj);
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

  cateIdChange(e){
    // console.log(e);
    this.router.navigate(['/videos/more', e]);
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
    this.example1SwipeOptions = {
      autoplay : 3000,
      loop: true,
      pagination: '.seed-sliders-pagination',
    };
    this.getSliderList();
    // this.videoService.getBannerImg();
    // this.videoService.getCateList();
    this.getCateListInfo();
  }

}
