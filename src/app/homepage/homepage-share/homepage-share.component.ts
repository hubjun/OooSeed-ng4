
import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";
import {Observable} from "rxjs";
import {FeedRespVO} from "../../domain/interface.model";

@Component({
  selector: 'person-share',
  templateUrl: './homepage-share.component.html',
  styleUrls: ['./homepage-share.component.scss'],
})
export class HomepageShareComponent implements OnInit {
  public pictureVideo=[];
  public pictureSingle=[];
  public videoSingle=[];
  public feeds:Observable<FeedRespVO[]>;
  subscription: Subscription = new Subscription();

  scrollContainer;
  @Input() userid:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService,
  ) {
    this.feeds = this.homepageService.feeds;
  }

  //获取分享图片视频
  share_Picture_Video(obj){
    this.subscription.add(
      this.homepageService.getPeronPicture(obj).subscribe(res => {
        let object=res;
        if (object.result == 0 && object.data.list) {
          this.pictureVideo = object.data.list;
          for (let i = 0; i < this.pictureVideo.length; i++) {
            if (this.pictureVideo[i].type == '2') {
                this.pictureSingle.push(this.pictureVideo[i]);
            } else{
                this.videoSingle.push(this.pictureVideo[i]);
            }
          }
        }
      })
    )
  }
  ngOnInit() {
    this.share_Picture_Video(this.userid);
    this.homepageService.getUserFeed(this.userid);

    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
