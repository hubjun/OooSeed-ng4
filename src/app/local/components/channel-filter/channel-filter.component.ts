import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalService } from '../../local.service';
import { DictReversalVO, SNSResult, BaseDictCommonVO, DictArea, IpAuthCateLevelVO, DictCityVO } from '../../../domain/interface.model';
import { Router, NavigationStart, NavigationEnd } from '@angular/Router';
import { ToolsService } from '../../../shared/tools/tools.service';


@Component({
  selector: 'channel-filter',
  templateUrl: './channel-filter.component.html',
  styleUrls: ['./channel-filter.component.scss']
})
export class ChannelFilterComponent implements OnInit {
  private subscription: Subscription = new Subscription();
  //排序器状态
  private isOpen: boolean = false;
  private changeCity: boolean = true;
  private currentFilter: string;
  // private currentChannel: string;
  //排序规则

  public filterType = {
    sportType: [],
    rangType: [],
    sortType: [],
    userType: []
  }
  //排序结果
  private filterResult = {
    sportType: {
      id: null,
      index: 0,
      text: '全部'
    },
    rangType: {
      id: 1,
      areaId: null,
      index: 0,
      text: '全城',
      position: null
    },
    sortType: {
      id: null,
      index: 0,
      text: ''
    },
    userType: {
      ipCateId: null,
      index: 0,
      cateName: '全部',
    }
  }
  //缓存公用排序规则
  private filterTypeCache = {
    sportType: [],
    userType: []
  }
  //缓存公用排序结果
  private filterResultCache = {
    sportType: {
      index: 0,
      text: '全部'
    }
  }
  constructor(
    private router: Router,
    private localService: LocalService,
    private toolsService: ToolsService
  ) {
    this.subscription.add(
      this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: any) => {
        this.localService.currentLocalChannel=event.urlAfterRedirects;
        let autoCity = this.localService.location.autoCity;
        let currentCity = this.localService.location.currentCity
        if (autoCity != null) {
          this.setLocationCity(currentCity);
          this.localService.currentCityName.next(currentCity.title);
        }
        else {
          this.localService.getLocationCity().then((autoCity: any) => {
            this.setLocationCity(autoCity);
          });
        }
      })
    )
    /**
     * 接收各栏目传过来的排序规则
     */
    this.subscription.add(
      this.localService.filter.filterType.subscribe((filterType: any) => {
        this.filterType.sortType = filterType.sortType;
        this.filterResult.sortType.text = filterType.sortType[0].title;
        this.setSportTypeAndUserType(filterType);
      })
    )

    /**
       * 接收手选城市后传过来的城市对象
       */
    this.localService.handCity.subscribe((city: any) => {
      console.log(city)
      if (city.parentId) {
        this.changeCityConfirm(city);
      }
      else {
        this.filterResult.rangType = city;
        // this.localService.filterResult.next(this.filterResult.rangType);
      }
    })
  }

  /**
* 设置定位城市
*/
  setLocationCity(city: any) {
    if (city != null) {
      let areaList = city.areaList || city.dictTreeNodeList;
      let position = city.position;
      if (city.areaId === this.localService.location.autoCity.areaId && areaList[1].id !== 2) {
        let nearby = {
          "id": 2,
          "title": "附近",
          "areaId": null
        }
        areaList.splice(1, 0, nearby);
      }
      let areaResult = this.localService.filter.areaResult;

      if (areaResult == null) {
        let rangTypeResult = this.filterResult.rangType;
        rangTypeResult.index = 0;
        rangTypeResult.text = '全城';
        rangTypeResult.areaId = city.areaId;
        rangTypeResult.position = this.localService.location.position;
        console.log(rangTypeResult)
        areaResult = rangTypeResult;
      }
      else {
        this.filterResult.rangType = areaResult;
      }
      this.filterType.rangType = areaList;//定位成功后设为当前区域排序规则
      this.localService.filterResult.next(this.filterResult);//触发栏目数据加载事件
    }
  }
  /**
      * 处理按城市排序
      *@param(city):当前城市
      */
  // handlerSortByCity(city) {
  //   let areaList = city.areaList || city.dictTreeNodeList;
  //   //若所选城市为定位城市且没有添加附近
  //   if (city.areaId === this.localService.location.autoCity.areaId && areaList[1].id !== 2) {
  //     let nearby = {
  //       "id": 2,
  //       "title": "附近",
  //       "areaId": null
  //     }
  //     areaList.splice(1, 0, nearby);
  //   }
  //   let rangTypeResult = this.filterResult.rangType;
  //   rangTypeResult.index = 0;
  //   rangTypeResult.text = '全城';
  //   rangTypeResult.areaId = city.areaId;
  //   rangTypeResult.position = this.localService.location.position;

  //   // this.filterType.rangType = areaList;
  //   this.localService.location.currentCity = city;
  //   this.localService.filter.areaResult = rangTypeResult;
  //   this.localService.filterResult.next(this.filterResult);
  // }
  /**
   * 切换到定位城市提示
   * @param(city):当前城市
   */
  changeCityConfirm(city) {
    let autoCity = this.localService.location.autoCity;
    let currentCity = this.localService.location.currentCity;

    if (this.localService.changeCity && autoCity != null && autoCity.areaId != city.areaId) {//当前城市非定位城市
      let that = this;
      this.toolsService.presentConfirm(`定位到您在${autoCity.title},要切换至${autoCity.title}吗？`, 1, function () {
        that.localService.location.currentCity = autoCity;
        that.localService.filter.areaResult=null;
        that.setLocationCity(autoCity);
        that.localService.currentCityName.next(currentCity.title);//更改同城标题
      }, function () {
        that.localService.changeCity = false;//不再提示
        // that.handlerSortByCity(city);
      });
    }
  }
  /**
   * 按运动类型排序
   */
  sortBySportType(type: DictArea | IpAuthCateLevelVO | any, index: number): void {
    this.hideFilter();

    let sportTypeResult = this.filterResult.sportType;
    let sportTypeResultCache = this.filterResultCache.sportType;
    sportTypeResult.index = index;
    if (!type.cateName) {
      sportTypeResult.id = type.id;
      sportTypeResult.text = type.title;
      //缓存结果
      sportTypeResultCache.index = index;
      sportTypeResultCache.text = type.title;

    }
    else {
      let userTypeResult = this.filterResult.userType;
      userTypeResult.ipCateId = type.ipCateId;
      userTypeResult.index = index;
      userTypeResult.cateName = type.cateName;

      sportTypeResult.text = type.cateName;
    }
    this.localService.filterResult.next(this.filterResult);
  }
  /**
   * 按区域排序
   */
  sortByRangType(type: DictCityVO | any, index: number): void {
    this.hideFilter();
    let rangTypeResult = this.filterResult.rangType;
    if (type.id === 1) {
      rangTypeResult.id = 1;
    }
    else if (type.id === 2) {
      rangTypeResult.id = 2;
    }
    else {
      rangTypeResult.id = 3;
    }
    rangTypeResult.text = type.title;
    rangTypeResult.index = index;
    rangTypeResult.areaId = type.areaId;

    this.localService.filter.areaResult = rangTypeResult
    this.localService.filterResult.next(this.filterResult);
  }
  /**
   * 按各栏目自有规则排序
   */
  sortBySortType(type: any, index: number) {
    this.hideFilter();
    let sortTypeResult = this.filterResult.sortType;
    sortTypeResult.id = type.id;
    sortTypeResult.text = type.title;
    sortTypeResult.index = index;

    this.localService.filterResult.next(this.filterResult);
  }
  /**
   * 打开排序器
   */
  openFilter(e: any): void {
    console.log(this.filterType.rangType)
    this.currentFilter = e.target.getAttribute('data-type');
    if (this.isOpen) return
    this.isOpen = true;
    //解决栏目落差
    let filterEle = document.getElementById('local-filter');
    let filterOffsetHeight: number = filterEle.offsetHeight;
    let gapHeightStr: string = window.getComputedStyle(filterEle).marginTop.split('px')[0];
    let gapHeightNum: number = Number(gapHeightStr);
    document.getElementById('channel').style.marginTop = filterOffsetHeight + gapHeightNum + 'px';

    let currentCity = this.localService.location.currentCity;
    let areaList = currentCity.areaList || currentCity.dictTreeNodeList;
    this.filterType.rangType = areaList;
  }
  /**
   * 隐藏排序器
   */
  hideFilter() {
    this.isOpen = false;
    this.currentFilter = '';
    document.getElementById('channel').style.marginTop = '0px';
  }
  /**
   * 获取球类排序规则
   */
  getSportType(): void {
    let params = {
      lang: 'zh_CN'
    }
    this.subscription.add(
      this.localService.getSportType(params).subscribe((res) => {
        if (res.result === '0') {
          let sportType = res.data.dicts;
          let whole = {
            "id": null,
            "title": "全部"
          }
          sportType.unshift(whole);
          this.filterType.sportType = sportType;
          this.filterTypeCache.sportType = sportType;//缓存运动类型
        }
      })
    )
  }
  /**
   * 获取个人IP类别
   */
  getUserType(): void {
    this.subscription.add(
      this.localService.getAuthCate().subscribe((res) => {
        if (res.result === '0') {
          let userTypes: any = res.data;
          let whole = {
            "ipCateId": null,
            "cateName": "全部"
          }
          userTypes.unshift(whole);
          this.filterType.userType = userTypes;
          this.filterTypeCache.userType = userTypes;
        }
      })
    )
  }
  /*
  * 设置排序规则
  */
  setSportTypeAndUserType(filterRule: any) {
    let filterType = this.filterType;//规则
    let filterResult = this.filterResult;//结果
    let filterTypeCache = this.filterTypeCache;
    let filterResultCache = this.filterResultCache;
    if (!filterRule.userType) {
      //非个人IP栏目
      filterType.sportType = filterTypeCache.sportType;
      filterResult.sportType.index = filterResultCache.sportType.index;
      filterResult.sportType.text = filterResultCache.sportType.text;
    }
    else {
      //个人IP栏目
      if (filterResult.userType.ipCateId != null) {//有缓存
        filterType.sportType = filterTypeCache.userType;
        filterResult.sportType.index = filterResult.userType.index;
        filterResult.sportType.text = filterResult.userType.cateName;
      } else {//无缓存
        // filterResult.sportType.text = filterType.userType[0].cateName;
        if (this.filterTypeCache.userType.length != 0) {
          filterType.sportType = this.filterTypeCache.userType;
        }
        else {
          this.subscription.add(
            this.localService.getAuthCate().subscribe((res) => {
              if (res.result === '0') {
                let userTypes: any = res.data;
                let whole = {
                  "ipCateId": null,
                  "cateName": "全部"
                }
                userTypes.unshift(whole);
                this.filterType.userType = userTypes;
                this.filterTypeCache.userType = userTypes;
                filterType.sportType = userTypes;
              }
            })
          )
        }
      }
    }
  }

  ngOnInit() {
    this.getSportType();
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
