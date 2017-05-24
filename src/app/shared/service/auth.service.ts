import { Injectable } from '@angular/core';
import * as sha1 from 'js-sha1';
import {ToolsService} from "../tools/tools.service";
import {Router} from "@angular/router";
@Injectable()
export class AuthService {
  private timestamp:any = '';
  redirectUrl:string;
  isLoggedIn:string  = this.getLogin();
  private HAS_LOGGED_IN = 'hasLoggedIn';
  constructor(
    public tools:ToolsService,
    private router: Router
  ){
    console.log( this.getLogin())
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
  }

  logout() {
    this.isLoggedIn = null;
    localStorage.clear();
    // this.tools.showToast('退出成功,正在跳转页面',1000,function () {
    //   window.location.reload();
    // });
  }

  redirectLoginPage(){
    this.router.navigate(['/login'])
  }

  signup(userid:string){
    this.setUserid(userid);
  }

  setLogin(key:string){
    // this.isLoggedIn = true;

    localStorage.setItem(this.HAS_LOGGED_IN,key);
    localStorage.setItem(this.isLoggedIn,key);
    this.isLoggedIn = key;
  }



  getLogin(){
    return localStorage.getItem(this.isLoggedIn)
  }
  hasLoggedIn(){
    return localStorage.getItem(this.HAS_LOGGED_IN)
  }

  buildSignature(userid:string,token:string,timestamp){
    return sha1(userid+token+timestamp)
  }
}
