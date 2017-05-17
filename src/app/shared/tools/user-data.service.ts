/**
 * Created by chenwenhao on 2017/3/3.
 * @description
 * 此模块是用户登录信息模块
 */

import {Injectable} from "@angular/core";
import * as sha1 from 'js-sha1';
// import {ModalController, Events} from "ionic-angular";
// import {LoginPage} from "../pages/login/login";
import {ToolsService} from "./tools.service";
import {Router} from '@angular/router';


@Injectable()
export class UserDataService {
  private HAS_LOGGED_IN = 'hasLoggedIn';
  private timestamp:any = '';
  public loginStatus:boolean = true;
  public modal;
  constructor(
    // public modalCtrl:ModalController,
    public tools:ToolsService,
    private router: Router
    // public events:Events,
  ){
  }


  setTimestamp(){
    this.timestamp = new Date();
  }

  getTimestamp(){
    return this.timestamp
  }

  setUserid(userid: string) {
    localStorage.setItem('userid',userid)
  }

  getUserid(){
    return localStorage.getItem('userid');
  }

  setToken(token:string){
    localStorage.setItem('token',token)
  }

  getToken(){
    return localStorage.getItem('token');
  }

  setRefreshToken(refreshToken:string){
    localStorage.setItem('refreshToken', refreshToken);
  }

  getRefreshToken(){
    return localStorage.getItem('refreshToken');
  }

  login(userid:string,token:string,refreshToken:string){
    this.setUserid(userid);
    this.setToken(token);
    this.setRefreshToken(refreshToken);
    this.setLogin('true');
    // this.events.publish('login:success',Date.now())
  }

  logout() {
    localStorage.clear();
    // this.tools.showToast('退出成功,正在跳转页面',1000,function () {
    //   window.location.reload();
    // });
  }

  showLoginPage(){
    this.router.navigate(['/login'])
    // let modal = this.modalCtrl.create(LoginPage);
    // modal.onDidDismiss(data =>{
    //   this.loginStatus = true;
    // })
    // if(this.loginStatus){
    //   modal.present();
    //   this.loginStatus = false;
    // }
  }

  signup(userid:string){
    this.setUserid(userid);
  }

  setLogin(key:string){
    localStorage.setItem(this.HAS_LOGGED_IN,key)
  }

  hasLoggedIn(){
    return localStorage.getItem(this.HAS_LOGGED_IN)
  }

  buildSignature(userid:string,token:string,timestamp){
    return sha1(userid+token+timestamp)
  }

}
