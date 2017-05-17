import { Injectable } from '@angular/core';
import {HttpService} from "../core/http.service";
import {ToolsService} from "../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";
import {UserShowTokenVO} from "../domain/interface.model";

@Injectable()
export class MineService {
  subscription: Subscription = new Subscription();

  private Login_Out='/user/_logout';
  private Search_User_Info='/user/_guest/userInfo';
  private myTeamsUrl = '/_guest/team/list';
  private USER_LATEST_SCHEDULT_URL = '/user/latestUserSchule'//获取用户最近日程
  private USER_NEWEST_SCHEDULI_URL = '/user/scheduleInfo' //获取用户今日日程
  private USER_INFO_UPDATE_URL='/user/_userInfo';//编辑个人信息
  private AVATAR_URL = '/user/uploadIconFile';//上传头像

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
}

