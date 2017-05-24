import { Component, OnInit } from '@angular/core';
import {UserAlbumFileVO, UserInfoVO} from "../../../domain/interface.model";
import {Observable, Subject, BehaviorSubject} from "rxjs";
import {HomepageService} from "../../homepage.service";
import {Params, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'seed-viewer-album',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss']
})
export class ViewerAlbumComponent implements OnInit {
  /*public list = [
    {
      "playTurnId":194,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/8a8546789d314d5b97ae741c86264ca6.jpg",
      "title":"足坛少了一位女球王，却多了一位奥运会女拳，她就是在伦敦奥运会女子轻量级拳击项目中斩获金牌的凯蒂.泰勒",
      "status":1,
      "clickUrl":"http://pc.sport.com/personal/index/feedetail/13689",
      "resPosition":6001,
      "resType":4,
      "resId":"13689",
      "sortValue":4,
      "fileId":0,
      "deviceType":4,
      "visible": true
    },
    {
      "playTurnId":193,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/8b1710726be244e79514bd744378975c.jpeg",
      "title":"热辣资讯",
      "status":1,
      "resPosition":6001,
      "resType":4,
      "resId":"13693",
      "sortValue":3,
      "fileId":0,
      "deviceType":4,
      "visible": false,
    },
    {
      "playTurnId":192,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/29fa51ee754a4b06962c95e9d49a5761.jpg",
      "title":"精彩赛事资讯",
      "status":1,
      "resPosition":6001,
      "resType":4,
      "resId":"13700",
      "sortValue":2,
      "fileId":0,
      "deviceType":4,
      "visible": false,
    },
    {
      "playTurnId":191,
      "resUrl":"http://192.168.10.115:5088/f/20170317/sport/sns/cms/i/65a9d7883b70477985b7a104b7ee5f3b.jpg",
      "title":"17投11中，砍30分，火箭捡到宝了",
      "status":1,
      "resPosition":6001,
      "resType":4,
      "resId":"13686",
      "sortValue":1,
      "fileId":0,
      "deviceType":4,
      "visible": false,
    }
  ]*/
  public userId:UserInfoVO;
  public activeIndex:any;
  public _activeIndex:BehaviorSubject<any> = new BehaviorSubject<any>({});
  public gallery:Observable<UserAlbumFileVO[]>;
  constructor(
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
  ) {
    this.gallery = this.homepageService.gallery;
    this.activeIndex = this._activeIndex.asObservable();
  }

  ngOnInit() {
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        this.userId = params['userId'];
        if(params['userId'])
          this.homepageService.getUserAlbum(params['userId'],2,1,1,30)
      });
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this._activeIndex.next(params['index'])
      })
    console.log(this.gallery)
  }

}
