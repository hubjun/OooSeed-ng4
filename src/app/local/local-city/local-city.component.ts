import { Component, OnInit, ElementRef, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/Router';
import { Subscription, Observable } from 'rxjs';
import { LocalService } from '../local.service';
import { ToolsService } from '../../shared/tools/tools.service';
import { DictArea, DictCityVO } from '../../domain/interface.model';
import * as _ from 'lodash';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
@Component({
  selector: 'local-city',
  templateUrl: './local-city.component.html',
  styleUrls: ['./local-city.component.scss']
})
export class LocalCityComponent {
  public currertCity: DictCityVO;//当前城市
  public currentAreaText: string;//当前区域名称
  public currentAreaId: number;
  public hotCity: DictCityVO[];//热门城市
  public allCity: DictCityVO[];//全部城市
  public locationCity: DictCityVO | any;//定位城市
  public locationAreaText: string;//定位城市
  public showArea: boolean = false;
  public currentLocalChannel: string = this.localService.currentLocalChannel;
  public letters = 'ABCDEFGHJKLMNPQRSTWXYZ'.split('');

  subscription: Subscription = new Subscription();

  constructor(
    public localService: LocalService,
    public toolsService: ToolsService,
    public router: Router
  ) {

  }
  /**
   * 定位
   */
  location() {
    let autoCity = this.localService.location.autoCity;
    if (autoCity != null) {
      this.locationCity = autoCity;
      this.setLocationCity(this.localService.location.currentCity);
    }
    else {
      this.localService.getLocationCity().then((city: any) => {
        this.currertCity = city;
        this.locationCity = city;
        this.setLocationCity(city);
      });
    }
  }
  /**
  * 设置定位城市
  */
  setLocationCity(city): void {
    this.currertCity = city;
    this.currentAreaText = city.title;
    this.currentAreaId = city.areaId;
  }

  /**
  * 根据所选城市所有区县
  */
  sortByCity(city: DictCityVO | DictArea | any, index?: number): void {
    let areaResult = {
      id: 1,
      areaId: city.areaId,
      index: index,
      text: city.title,
      position: this.locationCity.position
    }
    if (index == undefined) {
      let cityArea = city.areaList || city.dictTreeNodeList; //热门城市|所有城市
      let whole = {
        "id": 1,
        "areaId": city.areaId,
        "title": '全城'
      }
      if (cityArea.length > 0) {
        if (cityArea[0].title != '全城') {
          cityArea.unshift(whole)
        }
      }
      else {
        cityArea.unshift(whole)
      }

      areaResult.text = '全城';
      areaResult.index = 0;
      this.currertCity = city;
      this.localService.filter.areaResult = areaResult;
      this.localService.handCity.next(city);//触发排序
      this.localService.location.currentCity = city;//全局存储当前城市
      this.setCurrentArea();
    }
    else {
      if (city.id === 1) {
        areaResult.id = 1;
      }
      else if (city.id === 2) {
        areaResult.id = 2;
        areaResult.areaId = null;
      }
      else {
        areaResult.id = 3;
      }
      this.localService.filter.areaResult = areaResult;
      this.localService.handCity.next(areaResult);//触发排序
    }
    let currentLocalChannel = this.currentLocalChannel;
    currentLocalChannel != '' ? currentLocalChannel : '/local';
    this.router.navigate([currentLocalChannel]);
  }
  // /**
  // * 展示定位城市所有区域
  // */
  sortByLocationCity(): void {
    this.sortByCity(this.locationCity);
  }

  /**
   * 查询热门城市
   */
  getHotCity(): void {
    let opts = {
      langType: 'zh_CN'
    };
    this.subscription.add(
      this.localService.getHotCity(opts).subscribe(res => {
        if (res.result === '0') {
          this.hotCity = res.data.dictCityVOList;
        }
      })
    )
  };
  /**
   * 查询所有城市
   */
  getAllCity(): void {
    let opts = {
      langType: 'zh_CN'
    };
    this.subscription.add(
      this.localService.getProCity(opts).subscribe(res => {
        if (res.result === '0') {
          let provinces = res.data.dictTreeNodeVOList;
          let citys = [];
          for (let i = 0; i < provinces.length; i++) {
            for (let j = 0; j < provinces[i].dictTreeNodeList.length; j++) {
              citys = citys.concat(provinces[i].dictTreeNodeList[j]);
            }
          }
          this.sortCityByLetter(citys);
        }
      })
    );
  };
  /**
   * 按字母排序城市
   */
  sortCityByLetter(citys): void {
    //按字母分组
    let cityGroup = _.groupBy(citys, function (city) {
      return city.firstLetter;
    });
    //取出字母
    let cityObj = []
    let keys = Object.keys(cityGroup);
    for (let key of keys) {
      cityObj.push({
        "letter": key,
        "citys": cityGroup[key]
      });
    }
    //按字母排序
    this.allCity = _.sortBy(cityObj, function (item) {
      return item.letter;
    });
  }

  setCurrentArea() {
    let currertCity = this.localService.location.currentCity;
    let filterResult = this.localService.filter.areaResult;
    if (filterResult != null) {
      let currentArea = filterResult.text ? filterResult.text : '全城';
      this.currentAreaText = currertCity.title + currentArea;
      this.currentAreaId = filterResult.areaId;
    }
    else {

    }
  }
  toggleCityArea() {
    if (!this.showArea) {
      this.showArea = true;
    }
    else {
      this.showArea = false;
    }
  }
  /**
   * 模拟锚点定位
   * @param letter :模块 id
   */
  letterAnchorLocation(letter: string) {
    let offsetTop = document.getElementById(letter).offsetTop;
    document.querySelector('.seed-scroll-content').scrollTop = offsetTop;
  }

  ngOnInit() {
    this.location();
    this.getHotCity();
    this.getAllCity();
    this.setCurrentArea();
    console.log(this.localService.filter.areaResult)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
