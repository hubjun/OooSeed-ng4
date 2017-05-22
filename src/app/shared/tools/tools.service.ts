/**
 * Created by 陈文豪 on 2017/1/9.
 */
import { Injectable } from '@angular/core';
import { Md5 } from "ts-md5/dist/md5";
import {StatusCodeService} from "../status-code/status-code.service";
import {Subject, BehaviorSubject, Observable} from "rxjs";
import {isBoolean} from "util";

@Injectable()
export class ToolsService {
  private loadingRunning: boolean = false;
  private toastRunning: boolean = false;
  scrollTopSource:Subject<any> = new Subject<any>();
  scrollTop$ = this.scrollTopSource.asObservable();
  constructor(
    public code: StatusCodeService,
  ) {
  }

  setTitle(title:string){
  /*  document.getElementsByClassName('seed-toolbar-title')[0]
     .innerHTML = title;*/
  }
  scrollTop() {
    this.scrollTopSource.next();
  }

  set(target, states) {
    target = states;
  }

  get(target) {
    return target;
  }


  /**
   * @description MD5加密
   * @param key 加密的内容
   * @returns {string} md5加密后大写的内容
   */
  encryption(key: string) {
    let keys = Md5.hashStr(key).toString();

    return keys.toLowerCase();
  }

  /**
   * 格式化需要调用post请求需要的from数据
   * @param value
   * @returns {string} 格式化后数据的格式{email=example@gmail.com&password=abcd}
   */
  param(value) {
    return Object.keys(value).map((key)=>{
      let URI:string
      if(value[key]!=null)
      {
        URI=encodeURIComponent(key) + '=' + encodeURIComponent(value[key]);
      }
      return URI
    }).join('&');
  }

  /**
   * 格式化需要调用post请求需要的特殊from数据
   * 配合build
   * @param value
   * @returns {string} 格式化后数据的格式{email=example@gmail.com&password=abcd}
   */

  params(value){
    var s = [],
      add = function( key, value ) {
        s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
      };
    if (Array.isArray(value)) {
      for ( var v in value ) {
        add(v, value[v]);
      }
    } else {
      for ( var prefix in value ) {
        this.build( prefix, value[ prefix ], add );
      }
    }

    return s.join( "&" );
  }

  build(prefix, obj, add) {
    if (Array.isArray(obj)) {
      for (var i = 0; i < obj.length; i++) {
        this.build(prefix + "[" + ( typeof obj[i] === "object" ? i : "" ) + "]", obj[i], add);
      }
    } else if (typeof(obj) == "object") {
      for ( var name in obj ) {
        this.build( prefix + "." + name, obj[ name ], add );
      }
    } else {
      add( prefix, obj );
    }
  }

  /**
   * @description 调用此方法显示loading
   * @param content 显示的内容
   * @param duration 持续的时间,默认为5s
   */
  showLoading(content: string = '', duration: number = 6000) {
    let loading=document.createElement('div');
    loading.className='myLoaing';
    loading.innerHTML='<img src="../../../../assets/icon/loading.svg"width="50">'
    document.body.appendChild(loading);
    // let timer=setTimeout(()=>{
    //   this.hideLoading();
    //   clearTimeout(timer);
    // },duration)
  }

  /**
   * @description 关闭loading
   */
  hideLoading() {
      let loading=document.body.children;
      let arr = [];
      for(let i=0;i<loading.length;i++)
      {
        if(loading[i].nodeName=="DIV"&&loading[i].className=="myLoaing")
        {
          arr.push(loading[i]);
          // document.body.removeChild(loading[i]);
        }
      }
      for(let j= 0; j< arr.length;j++){
        document.body.removeChild(arr[j]);
      }
  }

  /**
   * @description 调用此方法显示toast
   * @param message 提示语
   * @param duration 持续时间
   */
  showToast(message: string = '操作完成', duration: number = 2000, callback?) {
    if (this.loadingRunning) {
      this.hideLoading();
    }
    if(this.toastRunning){
      return;
    }
    this.toastRunning = true;
    let toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    document.getElementsByTagName('body')[0].appendChild(toast);
    let addTime = setTimeout(() =>{  //异步增加className,淡入
      toast.className += ' fadeIn';
      clearTimeout(addTime);
    },0);
    let remvTime = setTimeout(() =>{  //先计算出淡出时间
      toast.className = 'toast';
      setTimeout(() =>{  //淡出之后去掉弹框
        document.getElementsByTagName('body')[0].removeChild(toast);
        callback? callback():'';
        this.toastRunning = false;
        clearTimeout(remvTime);
      },350)
    },duration - 350)
  }

  //Basic Alert
  showAlert(title:string,Tips:string,ok:string = '确定') {

  }

  //弹出框确认
  presentConfirm(message:string,style?:number,confirmCallback?,cancelCallback?) {
    let confirmBg=document.createElement('div');
    confirmBg.className='seed-confirm-bg';
    let bodyTogether=document.getElementsByTagName('body')[0];
    bodyTogether.appendChild(confirmBg);
    let bodyFather=document.createElement('div');
    bodyFather.className='seed-body-Father';

    bodyTogether.appendChild(bodyFather);
    bodyFather.innerHTML=`
      <div class="seed-confirm-Body">
        <div class="confirm-title"></div>
        <div class="confirm-button">
          <div class="confirm-no">取 消</div>
          <div class="confirm-yes">确 定</div>
        </div>
      </div>
    `;
    document.getElementsByClassName('confirm-title')[0].innerHTML=message;
    let removeChild=function(event){

      bodyTogether.removeChild(confirmBg);
      bodyTogether.removeChild(bodyFather);
      if(style){
        if(event.target.className=='confirm-yes')
        {
          confirmCallback?confirmCallback():'';
        }
        else{
          cancelCallback?cancelCallback():'';
        }
      }else {
        event.target.className=='confirm-yes'?window.open("http://h5.oooseed.com/app/activity/index.html"):'';
      }
      confrimCancle.removeEventListener('click',removeChild,false);
      confrimYes.removeEventListener('click',removeChild,false);
    };
    let confrimCancle=document.getElementsByClassName('confirm-no')[0];
    let confrimYes=document.getElementsByClassName('confirm-yes')[0];
    confrimCancle.addEventListener('click',removeChild,false);
    confrimYes.addEventListener('click',removeChild,false);
  }

  /**
   * 操作提示（上传，更新，错误等）
   * 默认1500ms
   */
  tips(msg: string, duration: any) {

  }

  showStatusCodeMsg(codeName,duration:any = 1500){
    let message = this.code.getStatusCode(codeName);
    this.showToast(message,duration)
  }
  //弹出框确认
  showConfirm(title:string,msg:string,confirmCallback:any,cancelCallback?:any) {

  }

  //设置对象为数组
  setArray(val) {
    return Array.from(val);
  }

  //回到顶部
  onBackToTop(){
    window.scrollTo(0, 0);
  }

  /**
   * @description 判断对象是否为空，如果为空返回true,反之false，
   * 用于ngIf判断显示或者隐藏
   * @param obj
   * @returns {boolean}
   */
  isEmeptyObject(obj) {
    return (Object.keys(obj).length === 0)
  }

  /**
   *
   * @param target 需要push的数组
   * @param data 需要遍历的数组list
   * @returns {string[]}
   */
  forAssistant(target: string[], data: string[]) {
    if (!target || !data) {
      return
    }
    for (let i = 0; i < data.length; i++) {
      target.push(data[i]);
    }
    return target;
  }
}
