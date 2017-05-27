/**
 * Created by chenwenhao on 2017/3/3.
 * @description
 * 此模块包含用户登录/用户注册HTTP模块
 */

import { Injectable } from "@angular/core";
import { HttpService } from "../../core/http.service";
import { ToolsService } from './tools.service';


@Injectable()
export class UserActivityService {
  public LOGIN_URL = '/user/_guest/login';
  public REGISTER_URL = '/user/_guest/register';
  public GET_SMS_CODE_URL = '/user/_guest/smsCode';
  public VALIDATE_SMS_CODE_URL = '/user/_guest/validateSmsCode'
  public NICKNAME_URL = '/user/_userInfo'
  constructor(
    public httpService: HttpService,
    public tools: ToolsService
  ) {
  }

  login(data) {
    let url = this.LOGIN_URL;
    return this.httpService.authenticate(url, data).map((res) => res.json());
  }

  //获取短信验证码
  getSMSCode(data) {
    let url = this.GET_SMS_CODE_URL;
    let uri = this.tools.param(data);
    return this.httpService.get(`${url}?${uri}`).map((res) => res.json());
  }
  //核实短信验证码
  checkSMSCode(data) {
    let url = this.VALIDATE_SMS_CODE_URL;
    let uri = this.tools.param(data);
    return this.httpService.get(`${url}?${uri}`).map((res) => res.json());
  }
  //注册
  register(data) {
    let url = this.REGISTER_URL;
    return this.httpService.authenticate(url, data).map((res) => res.json());
  }
  //设置昵称
  setNickname(data) {
    let url = this.NICKNAME_URL;
    // return this.httpService.userPut(`${url}?${data}`).map((res) => res.json());
    return this.httpService.putUrlencode(url,data).map((res) => res.json());
  }
}
