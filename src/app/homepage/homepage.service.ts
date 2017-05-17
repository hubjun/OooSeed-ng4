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
    let url=this.PERSON_MY_FANS+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //我关注的人
  getMycare(obj){
    let url=this.PERSON_MY_CARE+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }
  //服务
  getService(obj){
    let url=this.PERSON_SERVICE+'?userId='+obj;
    return this.httpService.get(url).map((res)=>res.json());
  }










}
