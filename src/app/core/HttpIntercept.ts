import {Injectable} from '@angular/core';
import {
  Http, Response, RequestOptions, ConnectionBackend, RequestOptionsArgs, Headers,
} from '@angular/http';


import {Observable} from "rxjs";
import {UserDataService} from "../shared/tools/user-data.service";


const   ClientType:string = '4';
@Injectable()
export class HttpIntercept extends Http {

  public userid:string ;
  public token:string ;
  public HAS_LOGGED_IN:boolean = false;
  constructor(
    public backend: ConnectionBackend,
    public defaultOptions: RequestOptions,
    public userData:UserDataService,
  ) {
    super(backend, defaultOptions);
      this.getUserData()
  }


  getUserData(){
    this.userid = this.userData.getUserid();
    this.token = this.userData.getToken();
    this.HAS_LOGGED_IN = !!this.userData.hasLoggedIn();
  }
  _setCustomHeaders(options?: RequestOptionsArgs):RequestOptionsArgs{


    if(!options) {
      options = new RequestOptions({});
    }
    if (!options.headers) {
      options.headers = new Headers();
    }

    if(this.userData.hasLoggedIn() == 'false' || this.userData.hasLoggedIn() == null){
      options.headers.set("X-SNS-UserId", '');
      options.headers.set("X-SNS-Timestamp", '');
      options.headers.set("X-SNS-Signature",'');
      options.headers.set("X-SNS-ClientType",ClientType);
    }else{
      this.getUserData();

      let timestamp = new Date().getTime();
      let signature = this.userData.buildSignature(this.userid,this.token,timestamp)
      options.headers.set("X-SNS-UserId", this.userid);
      options.headers.set("X-SNS-Timestamp", timestamp.toString());
      options.headers.set("X-SNS-Signature",signature);
      options.headers.set("X-SNS-ClientType",ClientType);
    }

    //console.log('userid:'+this.userid,'token:'+this.token,'login'+this.HAS_LOGGED_IN)

    return options;
  }
  get(url: string, options ?: RequestOptionsArgs): Observable < Response > {

    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {

      super.get(url, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.post(url, body, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }

  put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.put(url, body, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }

  delete(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.delete(url, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.patch(url, body, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }


  head(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.head(url, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }


  options(url: string, options ?: RequestOptionsArgs): Observable < Response > {
    options = this._setCustomHeaders(options)

    return Observable.create((observer) => {
      super.options(url, options).subscribe(res => {
        observer.next(res);
      }, err => {
        observer.error(err);
      });
    });
  }

}
