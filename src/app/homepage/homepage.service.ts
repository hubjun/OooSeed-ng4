import { Injectable } from '@angular/core';
import {HttpService} from "../core/http.service";
import {ToolsService} from "../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class HomepageService {
  subscription: Subscription = new Subscription();

  public PERSON_INFO='/user/_guest/userInfo';//查询个人信息
  public PERSON_PICTURE_VIDEO='/user/_guest/albumFile';//个人中心相册及视频
  public PERSON_TEAM_JOIN='/_guest/team/join';//用户加入的球队
  public PERSON_TEAM_CREATE='/_guest/team/create';//用户创建的球队
  public PERSON_MY_FANS='/user/_guest/findFans';//我的粉丝
  public PERSON_MY_CARE='/user/_guest/findFollow';//我关注的人
  public PERSON_SERVICE='/user/_guest/auth';//服务
  public PERSON_ADD_CARE_FANS='/user/friend';//新增关注
  public PERSON_DELETE_CARE_FANS='/user/friend';//取消关注

  private GET_USER_FEED_URL = '/feed/feed';
  private GET_USER_ARTICLE_LIST_URL = '/article/_guest/articleList';
  private GET_USER_FEED_DIGG_URL = '/user/feedDigg';
  private FRIEND_URL = '/user/friend';

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
  //查询用户加入的球队信息
  getPersonJoin(obj){
    let url=this.PERSON_TEAM_JOIN+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //查询用户创建的信息
  getPeronCreate(obj){
    let url=this.PERSON_TEAM_CREATE+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我的粉丝
  getMyfans(obj){
    let url=this.PERSON_MY_FANS+'?userId='+obj+'&rows='+20;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我关注的人
  getMycare(obj){
    let url=this.PERSON_MY_CARE+'?userId='+obj+'&rows='+20;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //服务
  getService(obj){
    let url=this.PERSON_SERVICE+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }

  //
  getUserFeed(userId: string, page: number = 1, rows: number = 2) {
    let url = this.GET_USER_FEED_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map(res => res.json());
  }
  //
  getUserArticleList(userId: string, page: number = 1, rows: number = 10,publishStatus:number = 1,){
    let url = this.GET_USER_ARTICLE_LIST_URL + `?userId=${userId}&publishStatus=${publishStatus}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map(res => res.json());
  }
  //
  getUserFeedDigg(userId: string, page: number = 1, rows: number = 10){
    let url = this.GET_USER_FEED_DIGG_URL + `?userId=${userId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map(res => res.json());
  }
  //获取帖子关注fried
  GetFeedFierd(followUserId:string,operation:boolean = true){
    let data = {
      followUserId:followUserId
    };

    if (operation){
      let url = this.FRIEND_URL;
      return this.httpService.post(url,data).map((res) => res.json());
    }else {
      let url = this.FRIEND_URL + `?followUserId=${followUserId}`;
      return this.httpService.delete(url).map((res) => res.json());
    }
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
  //取消关注
  deleteCareFans(obj){
    let obx={followUserId:obj};
    let url=this.PERSON_DELETE_CARE_FANS+`?followUserId=${obj}`;
    return this.httpService.delete(url).map((res)=>res.json());
  }


  }










