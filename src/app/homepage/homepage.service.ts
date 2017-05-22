import { Injectable } from '@angular/core';
import {HttpService} from "../core/http.service";
import {ToolsService} from "../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";

@Injectable()
export class HomepageService {
  subscription: Subscription = new Subscription();

  public PERSON_INFO='/user/_guest/userInfo';//查询个人信息
  public PERSON_PICTURE_VIDEO='/user/_guest/albumFile';//个人中心相册及视频
  public PERSON_MY_FANS='/user/_guest/findFans';//我的粉丝
  public PERSON_MY_CARE='/user/_guest/findFollow';//我关注的人
  public PERSON_SERVICE='/user/_guest/auth';//服务
  public PERSON_ADD_CARE_FANS='/user/friend';//新增关注
  public PERSON_EVENTS='/_guest/match';//赛事

  public PERSON_EVENTS_ANNOUNCE='/_guest/matchNotice';//赛事公告
  public PERSON_EVENTS_RULE='/_guest/matchConstitution';//赛事章程
  public PERSON_EVENTS_DETAIL_DETAIL='/_guest/matchInfo';//赛事详情
  public PERSON_EVENTS_DETAIL_HEADER='/_guest/matchInfoHead';//赛事详情头部信息


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
  //新增关注
  addCareFans(obj){
    let obx={followUserId:obj};
    let url=this.PERSON_ADD_CARE_FANS;
    return this.httpService.postUrlencode(url,obx).map((res)=>res.json());
  }
  //赛事
  getEvents(obj){
    let url=this.PERSON_EVENTS+'?userId='+obj+'&statusList=4,5,6,7';
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


  }










