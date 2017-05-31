/**
 * Created by chenwenhao on 2017/1/13.
 * @description 此模块是所有http请求的方法跟模块
 * @param APP_HPST = 'http://192.168.10.45:8089'; 开发环境IP ADDRESS
 * @param APP_HOST = 'http://192.168.10.46:8089'; 测试环境IP ADDRESS
 * @param APP_HOST = 'http://h5.13322cc.com/api/v1'; 生产环境IP ADDRESS
 */
import {Injectable} from '@angular/core';
import {Http, Response, Headers, ResponseOptions, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import {ToolsService} from "../shared/tools/tools.service";
import { UserDataService } from '../shared/tools/user-data.service';

declare var $;
const  ClientType:string = '4';
@Injectable()

export class HttpService {
  //public APP_HOST = '/api/v1';
  public APP_HOST = 'http://192.168.10.46:8089/api/v1';   //测试地址
  //public APP_HOST = 'http://h5.13322cc.com/api/v1'; //生产地址
  // public APP_HOST = 'http://h5.oooseed.com/api/v1'; //生产地址
  //public APP_HOST = 'http://192.168.10.45:8089/api/v1';   //开发地址

  public options = new RequestOptions({});


  public headersUrlencode = new Headers({'Content-Type': 'application/x-www-form-urlencoded'})
  constructor(
    public http: Http,
    public tools: ToolsService,
    public userData: UserDataService
  ) {
    this.options.headers = new Headers();
    this.options.headers.set("X-SNS-ClientType",'4');
  }

  public get(url: string, setHeader?:Boolean): Observable<Response> {
    let URL = this.APP_HOST + url;
    if(!setHeader){
      let option = this.setHeader();
      return this.http.get(URL, option)
    }else{
      return this.http.get(URL, this.options)
    }
  }

  public post(url: string, data: any, setHeader?:Boolean): Observable<Response> {
    let URL = this.APP_HOST + url;
    let body = this.tools.param(data);
    if(!setHeader){
      let option = this.setHeader();
      return this.http.post(URL, body, option)
    }else{
      return this.http.post(URL, body, this.options)
    }
  }

  public postUrlencode(url: string, data: any): Observable<Response> {
    let URL = this.APP_HOST + url;
    let body = this.tools.param(data);
    return this.http.post(URL, body, {headers: this.headersUrlencode})
  }

  public authenticate(url: string, data: any): Observable<Response> {
    let URL = this.APP_HOST + url;
    let body = this.tools.param(data);
    return this.http.post(URL, body, {headers: this.headersUrlencode})
  }

  /**
   * 文件上传
   * @param url 接口路径
   * @param file 文件流
   * @author allenou
   */
  public upload(url: string, file: any): Observable<Response> {
    let formData = new FormData();
    let reader = new FileReader();
    let headers = new Headers();

    formData.append(file.name, file);
    reader.readAsText(file, "UTF-8");

    let boundary = '';
    reader.onload = function () {
      boundary = reader.result;
      headers.append('Content-Type', 'multipart/form-data;boundary=' + boundary);
    }

    let URL = this.APP_HOST + url;
    let options = new ResponseOptions({headers: headers});

    return this.http.post(URL, formData, options)
  }


  public delete(url: string) {
    let URL = this.APP_HOST + url;
    return this.http.delete(URL, {headers: this.headersUrlencode})
  }

  public put(url: string, data:any='', setHeader:Boolean=false) {
    let URL = this.APP_HOST + url;

    if(setHeader){
        let option = this.setHeader();
        return this.http.put(URL, data, option)
    }else{
      return this.http.put(URL, this.options)
    }
  }

  public putUrlencode(url: string, data: any) {
    let URL = this.APP_HOST + url;
    let body = this.tools.param(data);
    return this.http.put(URL, body, {headers: this.headersUrlencode})
  }

  /**
   * 对复杂JSON对象put方法
   * url:接口url
   * opt:JSON对象
   */
  public putJsonObj(url: string, opt: any) {
    let URL = this.APP_HOST + url;
    let body = JSON.stringify(opt);
    return this.http.put(URL, body, this.options)
  }

  public handleError(error: Response) {
    return Observable.throw('Server Error');
  }

  public userPut(url: string, data?:any, setHeader?:Boolean) {
    let URL = this.APP_HOST + url;
    if(!setHeader){
        let option = this.setHeader();
        return this.http.put(URL, data, option)
    }else{
      return this.http.put(URL, {headers: this.options})
    }
  }

  /**
   *  设置头部信息（签名、时间戳、用户id、客户端类型）
   *  关于user类型的接口都需要配置该信息
   */
  public setHeader(): RequestOptionsArgs{

    let userid = this.userData.getUserid();
    let token = this.userData.getToken();
    let HAS_LOGGED_IN = !!this.userData.hasLoggedIn();
    let options = new RequestOptions({});

    if (!options.headers) {
      options.headers = new Headers();
    }
    if(this.userData.hasLoggedIn() == 'false' || this.userData.hasLoggedIn() == null){
      options.headers.set("X-SNS-UserId", '');
      options.headers.set("X-SNS-Timestamp", '');
      options.headers.set("X-SNS-Signature",'');
      options.headers.set("X-SNS-ClientType",ClientType);
    }else{

      let timestamp = new Date().getTime();
      let signature = this.userData.buildSignature(userid,token,timestamp)
      options.headers.set("X-SNS-UserId", userid);
      options.headers.set("X-SNS-Timestamp", timestamp.toString());
      options.headers.set("X-SNS-Signature",signature);
      options.headers.set("X-SNS-ClientType",ClientType);
    }

    //console.log('userid:'+this.userid,'token:'+this.token,'login'+this.HAS_LOGGED_IN)
    return options

  }

}
