/**
 * Created by dell on 2017/5/8.
 */

import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { Router,ActivatedRoute} from '@angular/Router';
import {LocalService} from '../local.service';
import {Subscription} from "rxjs";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'local-recruit-detail',
  templateUrl: './local-recruit-detail.component.html',
  styleUrls: ['./local-recruit-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocalRecruitDetailComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  public detailObj:any={
    "recruitId": '',
    "minAge": 0,
    "maxAge": 0,
    "minAttendance": 0,
    "wingForward": "0",
    "consumptionPatternName": "",
    "formatName": "",
    "iconFileUrl": "",
    "id": '',
    "orgId": '',
    "status": 1,
    "title": "",
    "place1": "",
    "validTime": 0,
    "remarks": "",
    "createTime": 0,
    "createUserId": "",
    "orgName": "",
    "areaProv": 0,
    "areaProvName": "",
    "areaCity": 0,
    "areaCityName": "",
    "areaDist": 0,
    "areaDistName": "",
    "showInfo": "",
    "groupType": 0,
    "sportAttrName": "",
    "courtAddr": "",
    "weekSet": "0"
  };
  public spellToggle = false;
  public defaulticon:string=this.localservice.defaulticon;// 默认头像
  constructor(
    public route:ActivatedRoute,
    public localservice:LocalService,
   public ToolServices: ToolsService
  ) {

  }
  getRecruitDeital(recruitID){
    this.ToolServices.showLoading();
    this.subscription.add(
    this.localservice.getRecruitDetail(recruitID)
      .subscribe(rs => {
        this.detailObj=rs.data;
        this.ToolServices.hideLoading();
      })
    )
  };
  spellDetailToggle(){
    if(this.spellToggle==true){
      this.spellToggle=false;
    }else{
      this.spellToggle=true;
    }
  }
  gotoBack(){

  }
  tipClick(){
    this.ToolServices.presentConfirm('下载球苗app，查看更多精彩内容');
  }
  ngOnInit() {
    this.route.params.subscribe(param => {
      this.getRecruitDeital(param.recruitId);
})
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }

}
