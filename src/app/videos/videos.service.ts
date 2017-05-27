import { Injectable } from '@angular/core';
import {Response,URLSearchParams} from "@angular/http";
import {HttpService} from "../core/http.service";
import {AppPlayTurn,catePart} from '../domain/interface.model';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class VideosService {
  public INFO_BANNER_URL = '/file/playturn';
  public VIDEO_CATE_URL = '/video/home';
  public VIDEO_DETAIL = '/video';
  public VIDEO_RECOMMEND_LIST = '/video/id/list';
  public VIDEO_HOME_MORE = '/video/homeMore';

  public _bannerSlider: BehaviorSubject<AppPlayTurn[]>;
  public _cateVideo: BehaviorSubject<catePart[]>;
  public data = {
    bannerSlider: [] = [],
    cateVideo: [] = []
  };

  constructor(
    public httpService: HttpService
  ) {
    this._bannerSlider = new BehaviorSubject<AppPlayTurn[]>([]);
    this._cateVideo = new BehaviorSubject<AppPlayTurn[]>([]);
  }

  get banners(){
    return this._bannerSlider.asObservable();
  }

  // get cate(){
  //   return this._cateVideo.asObservable();
  // }

  getBannerImg(){
    let url = this.INFO_BANNER_URL + '?resPosition=6002&rows=5';
    this.httpService.get(url)
      .map((rs: Response) => rs.json())
      .subscribe((rs) => {
        this.data.bannerSlider = [...rs.data.list];
        this._bannerSlider.next(this.data.bannerSlider);
      })
  };
  getSlider(){
    let url = this.INFO_BANNER_URL + '?resPosition=6002&rows=5';
    return this.httpService.get(url).map((rs: Response) => rs.json());
  };

  getCateList(){
    let url = this.VIDEO_CATE_URL;
    return this.httpService.get(url)
      .map((rs: Response) => rs.json())
  };

  getDeVideoDetail(videoId) {
    // let params = new URLSearchParams();
    // params.set('videoId', videoId);
    let url = this.VIDEO_DETAIL + '?videoId=' + `${videoId}`;

    return this.httpService.get(url)
      .map((rs: Response) => rs.json())
  };

  getVideoDetailList(cataId) {
    let url = this.VIDEO_RECOMMEND_LIST + '?cateId=' + `${cataId}`;
    return this.httpService.get(url)
      .map((rs: Response) => rs.json())
  };

  getMoreList(cateId){
    let url = this.VIDEO_HOME_MORE + '?cateId=' + `${cateId}`;
    return this.httpService.get(url)
      .map((rs: Response) => rs.json())
  };

  // getCateList(){
  //   let url = this.VIDEO_CATE_URL;
  //   this.httpService.get(url)
  //     .map((rs: Response) => rs.json())
  //     .subscribe((rs) => {
  //       this.data.cateVideo = [...rs.data];
  //       this._cateVideo.next(this.data.cateVideo);
  //     })
  // };
}
