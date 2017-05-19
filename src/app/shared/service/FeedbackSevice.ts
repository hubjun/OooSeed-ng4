/**
 * Created by chenwenhao on 2017/3/16.
 * @description 此模块是关于用户操作相关的HTTP木块
 */

import {Injectable} from "@angular/core";
import {Response} from "@angular/http";
import {HttpService} from "../../core/http.service";
@Injectable()
export  class FeedbackSevice{
  private FRIEND_URL = '/user/friend';

  constructor(
    private httpService:HttpService
  ){}

  //获取帖子关注fried
  GetFeedFierd(followUserId:string,operation:boolean = true){
    let data = {
      followUserId:followUserId
    };

    if (operation){
      let url = this.FRIEND_URL;
      return this.httpService.postUrlencode(url,data).map((res) => res.json());
    }else {
      let url = this.FRIEND_URL + `?followUserId=${followUserId}`;
      return this.httpService.delete(url).map((res: Response) => res.json());
    }

  }

}
