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
  subscription: Subscription = new Subscription();

  constructor(
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) { }

  //获取分享图片视频
  share_Picture_Video(obj){
    this.ToolServices.showLoading();
    this.subscription.add(
      this.homepageService.getPeronPicture(obj).subscribe(res => {
        let object=res;
        if (object.result == 0 && object.data.list) {
          this.pictureVideo = object.data.list;
          for (let i = 0; i < this.pictureVideo.length; i++) {
            if (this.pictureVideo[i].type == '2') {
              while (this.pictureSingle.length<9){
                this.pictureSingle.push(this.pictureVideo[i]);
              }
            } else{
              while(this.videoSingle.length<9){
                this.videoSingle.push(this.pictureVideo[i]);
              }
            }
          }
        }
        this.ToolServices.hideLoading();
      })
    )
  }
  ngOnInit() {
    this.ToolServices.showLoading();
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.share_Picture_Video(params['userId']);
      })
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }

}
