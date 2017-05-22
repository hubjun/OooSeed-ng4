///<reference path="../../../../node_modules/@angular/cli/node_modules/rxjs/Observable.d.ts"/>
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'seed-homepage-share',
  templateUrl: './homepage-share.component.html',
  styleUrls: ['./homepage-share.component.scss'],
})
export class HomepageShareComponent implements OnInit {
  public pictureVideo=[];
  public pictureSingle=[];
  public videoSingle=[];
  public userId:string;
  subscription: Subscription = new Subscription();

  scrollContainer;
  constructor(
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) { }

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
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        this.share_Picture_Video(params['userId']);
        this.userId=params['userId'];
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
