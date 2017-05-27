import { Injectable } from '@angular/core';
import {HttpService} from "../core/http.service";
import {ToolsService} from "../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";
import {UserShowTokenVO} from "../domain/interface.model";

@Injectable()
export class MineService {
  subscription: Subscription = new Subscription();
  public saveClassTag:string='LaunchClass';

  public Login_Out='/user/_logout';
  public Search_User_Info='/user/_guest/userInfo';
  public myTeamsUrl = '/_guest/team/list';
  public USER_LATEST_SCHEDULT_URL = '/user/latestUserSchule'//获取用户最近日程
  public USER_NEWEST_SCHEDULI_URL = '/user/scheduleInfo' //获取用户今日日程
  public USER_INFO_UPDATE_URL='/user/_userInfo';//编辑个人信息
  public AVATAR_URL = '/user/uploadIconFile';//上传头像
  public USER_FOOTBALL_INGO_URL='/user/football/info';//个人足球信息
  public USER_GET_TEDIAN='/dict/characteristics/football';//个人足球场上特点
  public USER_GET_POSITION='/dict/position/football';//个人足球场上位置
  public editUserFootballInfoUrl = '/user/football/info';//个人足球位置与特点修改
  public jobHistoryUrl = '/_guest/ballResume/selectByUserId';  // 效力过球队
  public commentMeUrl = '/user/commentMe';//我的评论
  public atMeUrl = '/user/atMe';//@Me
  public diggMeUrl = '/user/diggMe';//赞我
  public areaUrl = '/dict/dictArea';//所有地区
  public myInfoUrl = '/article/_guest/articleList';//我的咨询
  public feedDiggUrl = '/user/feedDigg';//我的点赞
  public feedUrl = '/feed/feed';//我的帖子

  constructor(
    public httpService: HttpService,
    public toolsService: ToolsService
  ) {

  }

  //退出登录
  goLoginOut(){
    return this.httpService.post(this.Login_Out,'').map(res=>res.json());
  }
  //查询用户信息
  getUserInfo(userId:UserShowTokenVO){
    let url=this.Search_User_Info+'?userId='+userId;
    return this.httpService.get(url).map(res=>res.json());
  }
  //查询我的球队
  getMyTeams(page: number, rows: number, userId: any){
    let url=this.myTeamsUrl + '?userId='+userId + '&page=' +page+'&rows' +rows;
    return this.httpService.get(url).map(rs => rs.json())
      // .catch(this.handleError);
  };
  //获取用户今日日程
  getUserNewestSchedule(obj) {
    let url = this.USER_NEWEST_SCHEDULI_URL;
    let uri = this.toolsService.params(obj);
    return this.httpService.get(`${url}?${uri}`).map(res => res.json());
  }
  //获取用户最近日程
  getUserLatestSchedule() {
    let url = this.USER_LATEST_SCHEDULT_URL;
    return this.httpService.get(url).map(res => res.json());
  }
  //获取个人足球信息
  getfootballinfo() {
    let url = this.USER_FOOTBALL_INGO_URL+'?footballId=0';
    return this.httpService.get(url).map(res => res.json());
  }
  //获取个人足球场上位置
  getfootballpostion() {
    let url = this.USER_GET_POSITION;
    return this.httpService.get(url).map(res => res.json());
  }
  //获取个人足球场上特点
  getfootballtedian() {
    let url = this.USER_GET_TEDIAN;
    return this.httpService.get(url).map(res => res.json());
  }
  putBallLocation(params){
    // let opt = JSON.stringify(params);
    // return this.httpService.putJsonObj(this.editUserFootballInfoUrl ,params)
    return this.httpService.putJsonObj(this.editUserFootballInfoUrl,params)
      .map(rs => rs.json());
  };
 // 编辑个人信息
  UserInfoUpdate(data){
    // let cwh = $.param(opt);
    let url=this.USER_INFO_UPDATE_URL;
    return this.httpService.putUrlencode(url,data).map(rs => rs.json());
  };
  // 上传头像
  updateAvatar(file){
    let url = this.AVATAR_URL
    return this.httpService.upload(url, file).map(res => res.json());
  }
  // 效力过球队
  getHistory(userId: string){
    return this.httpService.get(this.jobHistoryUrl + `?userId=${userId}`)
      .map(rs => rs.json());
  };
  //我的评论
  getMyCommentMe(page: number, rows: number){
    let url = this.commentMeUrl + `?page=${page}` + `&rows=${rows}`;
    return this.httpService.get(url).map(rs => rs.json());
  };
  //@Me
  getAtMe(page: number, rows: number){
    let url= this.atMeUrl + `?page=${page}` + `&rows=${rows}`;
    return this.httpService.get(url).map((rs) => rs.json());
  };
  //@Me
  getDiggMe(page: number, rows: number){
    let url= this.diggMeUrl + `?page=${page}` + `&rows=${rows}`;
    return this.httpService.get(url).map((rs) => rs.json());
  };
  //获取地区数据
  getArea(){
    let url= this.areaUrl +'?langType=zh_CN';
    return this.httpService.get(url).map((rs) => rs.json());
  };
  //获取我的咨询
  getMyInfo(userId:string, page: number, rows: number){
    let url= this.myInfoUrl +`?userId=${userId}&publishStatus=1&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((rs) => rs.json());
  };
  //获取我的点赞
  getMyDigg(userId:string, page: number, rows: number){
    let url= this.feedDiggUrl +`?userId=${userId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((rs) => rs.json());
  };
  //获取我的帖子
  getMyFeed(userId:string, page: number, rows: number){
    let url= this.feedUrl +`?userId=${userId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((rs) => rs.json());
  };
}

