import { Component, OnInit, ElementRef } from '@angular/core';
import {VideosService} from '../videos.service';
import {ToolsService} from '../../shared/tools/tools.service';
import {Observable, Subject} from "rxjs";
import {Router, ActivatedRoute} from '@angular/router'
import {AppPlayTurn,catePart} from "../../domain/interface.model";
import {childOfKind} from "tslint";
import {count} from "rxjs/operator/count";

@Component({
  selector: 'app-video-home',
  templateUrl: './video-home.component.html',
  styleUrls: ['./video-home.component.scss']
})
export class VideoHomeComponent implements OnInit {
  public bannerObj : Observable<AppPlayTurn[]>;
  // public cateObj: Observable<catePart[]>;
  cateObj: any[] = [];
  listObj: any[] = [];

  constructor(
    private videoService: VideosService,
    private router: Router,
    private tools: ToolsService,
    private activeRoute: ActivatedRoute,
    public el:ElementRef
  ) {
    this.bannerObj = videoService.banners;
    // this.cateObj = videoService.cate;
    this.tools.setTitle('视频');
  }

  topCateMore(e,cateId){
    this.router.navigate(['/videos/more', cateId]);
  };

  getCateListInfo(){
    this.videoService.getCateList()
      .subscribe(rs => {
        if(rs.result === '0'){
          this.cateObj = rs.data;
          setTimeout(() => {
            this.setCateWidth();
          })
        }
      })
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
    this.videoService.getBannerImg();
    // this.videoService.getCateList();
    this.getCateListInfo();
  }

}
