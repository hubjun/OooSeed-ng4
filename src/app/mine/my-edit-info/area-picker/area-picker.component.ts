import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {MineService} from '../../mine.service';
import {Subscription} from "rxjs";
import { Router } from "@angular/Router";
import { ToolsService } from '../../../shared/tools/tools.service'

@Component({
  selector: 'area-picker',
  templateUrl: './area-picker.component.html',
  styleUrls: ['./area-picker.component.scss']
})
export class AreaPickerComponent implements OnInit {
  public ProvHascity: boolean = false;
  public allArea: any;
  public allCity: any;
  public chooseProv: any;
  public chooseCity: any;
  public hasChooseProv: boolean = false;
  public width: string = '0px';
  public pageLeft: string = '0px';
  public wrapHeight: string = '0px';
  public nowArea: string = 'provin';
  public screenWidth: number = 0;
  public subscription: Subscription = new Subscription();
  constructor(
    public mineSer: MineService,
    public router: Router,
    public tools: ToolsService,
  ) {
    this.screenWidth = document.documentElement.clientWidth;

  }

  ngOnInit() {

    this.dataInit();
  }
  dataInit() {
    this.tools.showLoading();
    let screenHeight = document.documentElement.clientHeight;
    // this.allArea = JSON.parse(this.interactiveSer.getProvices());
    this.subscription.add(
      this.mineSer.getArea().subscribe(res =>{
        this.tools.hideLoading();
        if(res.result == '0'){
          this.allArea = res.data.dictprovinceVOList;
        }
      })
    )
    this.width = (this.screenWidth * 2) + 'px';
    let titleHeight = document.querySelector('.title').clientHeight;
    let navHeight = document.querySelector('.nav').clientHeight ;
    let headerHeight = document.querySelector('seed-toolbar-header').clientHeight;
    this.wrapHeight = (screenHeight - titleHeight - navHeight - headerHeight - 22) + 'px';
  }


  /**
   * 选择省份之后匹配该省的所有市
   * @param i:number
   */
  choosingProv(i) {
    this.chooseProv = this.allArea[i];
    if (this.chooseProv['title'] == '北京市'
        || this.chooseProv['title'] == '上海市'
        || this.chooseProv['title'] == '天津市'
        || this.chooseProv['title'] == '重庆市'
        || this.chooseProv['title'] == '澳门特别行政区'
        || this.chooseProv['title'] == '香港'
        || this.chooseProv['title'] == '台湾省'
        ) {
      this.ProvHascity = false;
      let data = {
        areaProv: this.chooseProv['areaId'],
        areaCity: this.chooseProv['areaId']
      }
      this.tools.showLoading();
      this.mineSer.UserInfoUpdate(data).subscribe(res =>{
        this.tools.hideLoading();
        if(res.result == '0'){
            this.router.navigate(['/mine/my-edit-info']);
        }else{
          this.tools.showToast('请求失败，请从新选择~');
        }
      })
    }else{
      this.ProvHascity = true;
      this.nowArea = 'city';
      this.allCity = this.allArea[i]['cityAreaList'];
      this.pageLeft = (0 - this.screenWidth) + 'px';
    }
  }
  /**
   * 点击选择城市
   * @param i 选择城市的索引
   */
  choosingCity(i) {
    this.chooseCity = this.allCity[i];
    let data = {
      areaProv: this.chooseProv['areaId'],
      areaCity: this.chooseCity['areaId']
    }
    this.mineSer.UserInfoUpdate(data).subscribe(res =>{
        if(res.result == '0'){
            this.router.navigate(['/mine/my-edit-info']);
        }else{
          this.tools.showToast('请求失败，请从新选择~');
        }
      })
  }
  showProvin() {
    this.pageLeft = 0 + 'px';
    this.nowArea = 'provin';
  }

  showCity() {
    this.pageLeft = (0 - this.screenWidth) + 'px';
    this.nowArea = 'city';
  }
  ngOnDestroy(){
    // window.history.back();
  }
}
