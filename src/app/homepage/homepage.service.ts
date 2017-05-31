import { Injectable } from '@angular/core';
import {HttpService} from "../core/http.service";
import {ToolsService} from "../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";
import {BehaviorSubject} from "rxjs";
import {FeedRespVO, UserAlbumFileVO, UserInfoVO} from "../domain/interface.model";

@Injectable()
export class HomepageService {
  subscription: Subscription = new Subscription();
  public checkClass='share';

  public PERSON_INFO='/user/_guest/userInfo';//查询个人信息
  public PERSON_PICTURE_VIDEO='/user/_guest/albumFile';//个人中心相册及视频
  public PERSON_TEAM_JOIN='/_guest/team/join';//用户加入的球队
  public PERSON_TEAM_CREATE='/_guest/team/create';//用户创建的球队
  public PERSON_MY_FANS='/user/_guest/findFans';//我的粉丝
  public PERSON_MY_CARE='/user/_guest/findFollow';//我关注的人
  public PERSON_SERVICE='/user/_guest/auth';//服务
  public PERSON_ADD_CARE_FANS='/user/friend';//新增关注
  public PERSON_DELETE_CARE_FANS='/user/friend';//取消关注
  public PERSON_EVENTS='/_guest/match';//赛事
  public PERSON_EVENTS_ANNOUNCE='/_guest/matchNotice';//赛事公告
  public PERSON_EVENTS_RULE='/_guest/matchConstitution';//赛事章程
  public PERSON_EVENTS_DETAIL_DETAIL='/_guest/matchInfo';//赛事详情
  public PERSON_EVENTS_DETAIL_HEADER='/_guest/matchInfoHead';//赛事详情头部信息
  public GET_USER_FEED_URL = '/feed/feed';


  public _feeds:BehaviorSubject<FeedRespVO[]> = new BehaviorSubject<FeedRespVO[]>([]);
  public _gallery:BehaviorSubject<UserAlbumFileVO[]> = new BehaviorSubject<UserAlbumFileVO[]>([]);
  public _videoThumbnail:BehaviorSubject<UserAlbumFileVO[]> = new BehaviorSubject<UserAlbumFileVO[]>([]);
  public dataStore = {
    feeds   :[] = [],
    gallery :[] = [],
    videoThumbnail  :[] = []
  };

  constructor(
    public httpService: HttpService,
    public toolsService: ToolsService,
  ) {


  }

  //查询用户个人信息
  getPeronInfo(obj){
    let url=this.PERSON_INFO+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //查询个人中心相册及视频
  getPeronPicture(obj){
    let url=this.PERSON_PICTURE_VIDEO+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我的粉丝
  getMyfans(obj){
    let url=this.PERSON_MY_FANS+'?userId='+obj+'&rows='+20;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我的粉丝
  getMyfansHome(obj){
    let url=this.PERSON_MY_FANS+'?userId='+obj+'&rows='+8;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我关注的人
  getMycare(obj){
    let url=this.PERSON_MY_CARE+'?userId='+obj+'&rows='+20;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我关注的人
  getMycareHome(obj){
    let url=this.PERSON_MY_CARE+'?userId='+obj+'&rows='+8;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //服务
  getService(obj){
    let url=this.PERSON_SERVICE+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }


  //用户帖子
  get feeds(){
    return this._feeds.asObservable()
  }
  getUserFeed(userId:UserInfoVO, page: number = 1, rows: number = 2) {
    let url = this.GET_USER_FEED_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    this.httpService.get(url)
      .map(res => res.json())
      .subscribe((res) => {
        this.dataStore.feeds = [...res.data.list];
        this._feeds.next(this.dataStore.feeds);
      });
  }

  //查询我的粉丝
  getUserFindFans(userId: string, page: number = 1, rows: number = 8) {
    let url = this.PERSON_MY_FANS + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map(res => res.json());
  }
  //查询我的关注
  getUserFidFollow(userId: string, page: number = 1, rows: number = 8) {
    let url = this.PERSON_MY_CARE + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map(res => res.json());
  }

  //新增关注
  addCareFans(obj){
    let obx={followUserId:obj};
    let url=this.PERSON_ADD_CARE_FANS;
    return this.httpService.postUrlencode(url,obx).map((res)=>res.json());
  }
  //删除关注
  DeleteCareFans(obj){
    let obx={followUserId:obj};
    let url=this.PERSON_DELETE_CARE_FANS+'?followUserId='+obj;
    return this.httpService.delete(url).map((res)=>res.json());
  }
  //赛事
  getEvents(obj){
    let url;
    url=this.PERSON_EVENTS+'?userId='+obj+'&statusList=3,4,5,6&rows=6';
    return this.httpService.get(url).map((res)=>res.json());
  }
  //赛事公告
  getAnnounce(obj){
    let url=this.PERSON_EVENTS_ANNOUNCE+'?matchId='+obj+'&rows=3';
    return this.httpService.get(url).map((res)=>res.json());
  }
  //赛事章程
  getRule(obj){
    let url=this.PERSON_EVENTS_RULE+'?matchId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //赛事详情
  getDetail(obj){
    let url=this.PERSON_EVENTS_DETAIL_DETAIL+'?matchId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //赛事详情头部
  getDetailHeader(obj){
    let url=this.PERSON_EVENTS_DETAIL_HEADER+'?matchId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }

  get gallery(){
    return this._gallery.asObservable();
  }

  get videoThumbnail (){
    return this._videoThumbnail.asObservable();
  }
  getUserAlbum(userId: UserInfoVO, resType: number = 2, purType: number = 1, page = 1, rows = 10) {
    let url = this.PERSON_PICTURE_VIDEO + `?userId=${userId}&resType=${resType}&purType=${purType}&page=${page}&rows=${rows}`;
    this.httpService.get(url)
      .map(res => res.json())
      .subscribe((res) => {
        if (res && res.result == 0 && res.data && res.data.list) {
          let data = res.data.list;
          if(resType == 2){
            this.dataStore.gallery = [...data];
            this._gallery.next(this.dataStore.gallery)
          }else if(resType == 3){
            this.dataStore.videoThumbnail = [...data];
            this._videoThumbnail.next(this.dataStore.videoThumbnail)
          }
        }
      })
    ;
  }

}










