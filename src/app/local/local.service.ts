import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '../core/http.service';


import { DictReversalVO, SNSResult, DictArea, IpAuthCateLevelVO, RespCityEngageVO, DictCityVO, CommonPageVo, DictVersionCityVO, TeamEngageVO } from '../domain/interface.model';
import { Observable } from 'rxjs/Observable';
import { ToolsService } from '../shared/tools/tools.service';
import { Response } from '@angular/http';
import { Subject, BehaviorSubject, Subscription,AsyncSubject } from 'rxjs';

declare var AMap: any;//声明

@Injectable()
export class LocalService {
  //默认深圳坐标
  public coor = {
    long: 0,
    lat: 0,
  };
  public markPara:string='0';
  public postPara: EventEmitter<any>;
  public changeCity:boolean=true;//是否切换为定位城市
  public INFO_TEAM_CARD_URL = '/user/_guest/city/fight/ball';//拼球列表

  public INFO_MY_ACTIVITIES_URL = '/user/_guest/city/fight/findMyJoin';//我参与的拼球列表
  public INFO_MY_LAUNCH_URL='/user/city/fight/findMyCreate';//我发起的拼球
  public INFO_TEAM_CARD_DETAIL_URL = '/user/_guest/city/fight/fightInfo';//拼球详情页
  //约战
  public BOOKING_MATCH_URL = '/user/_guest/findCityFight';//约战
  public MATCH_DETAIL_URL = '/team/engageInfo'//约战详情

  // public SPORT_TYPE_URL = '/dict/sport/type';//球类类型
  public PersonIp_Url = '/user/_guest/findCityUser';//推荐个人ip列表
  public TeamIp_Url = '/_guest/team/recommended';//推荐球队ip列表
  //排序
  public SPORT_TYPE_URL = '/dict/sport/type';//球类类型
  public POSTCODE_URL = '/dict/getAreaByParentPostCode';  //通过邮编查询城市信息
  public AUTH_CATE_URL = '/user/_guest/authCate';//个人身份类别

  // 招募及详情
  public RecruitDetail_Url = '/team/recruit';
  public getRecruitListUrl = '/user/_guest/findCityRecruit';

  //新增关注
  public ToFollow = '/user/friend';

  // 默认头像
  public defaulticon='../../assets/icon/concern_default_head.png';// 默认头像
  public defaultTeamIcon='../../assets/icon/team_default_badgebig.png'// 默认球队头像

  //城市列表
  public HOT_CITY_URL= '/dict/hotDictCity';
  public PRO_CITY_URL = '/dict/getDictAreaTree';
  public CITY_AREA_URL = '/dict/getAreaByParentId';

  //排序
   public filter={
       areaResult:null,//object
       filterType:null,//event
       filterResult:null//event
  }
  public location={
    position:null,//object
    cityAreas:null,//Array
    autoCity:null,//object
    currentCity:null,//object
    autoSuccess:null//event
  }
  public handCity:EventEmitter<any>=new EventEmitter();
  public autoCity:Subject<DictCityVO|any> = new BehaviorSubject<DictCityVO|any>(null);
  public handAreaResult:Subject<DictArea>=new BehaviorSubject<DictArea>(null);
  public filterResult:Subject<any> = new Subject();
  public currentCityName=new Subject();
  public currentLocalChannel:string='';
  constructor(
    public httpService: HttpService,
    public toolsService: ToolsService
  ) {
    //排序
    this.location.autoSuccess=new EventEmitter();
    this.filter.filterType = new EventEmitter();
    this.filter.filterResult = new EventEmitter();
    this.postPara=new EventEmitter();
  }

 /**
  * 排序规则
  */
   //查询个人IP类别
   getAuthCate(): Observable<SNSResult<IpAuthCateLevelVO>>{
    let url = this.AUTH_CATE_URL + '?authType=1&parentId=0';
    return this.httpService.get(url).map(res => res.json())
  }
  //拼球部分
  getSpellInfo(param) {
    let urls=this.INFO_TEAM_CARD_URL+`?sportType=${param.sportType}&orderId=${param.orderId}&cityId=${param.cityId}&raidus=${param.raidus}&areaId=${param.areaId}&longitude=${param.longitude}&latitude=${param.latitude}&page=${param.page}&rows=${param.rows}`;
    return this.httpService.get(urls).map((res) => res.json());
  }
  //获取拼球详细信息
  getSpellDetail(fightId) {
    let url = this.INFO_TEAM_CARD_DETAIL_URL + `?fightId=${fightId}&lat=${this.coor.lat}&lon=${this.coor.long}`;
    return this.httpService.get(url).map((res) => res.json());
  }
  //我发起的拼球
  getMySpell(param) {
    let urls=this.INFO_MY_LAUNCH_URL+`?longitude=${param.longitude}&latitude=${param.latitude}&page=${param.page}&rows=${param.rows}&userId=${param.userId}`;
    return this.httpService.get(urls).map((res) => res.json());
  }
  //我参与的拼球
  getMyJoin(param) {
    let urls=this.INFO_MY_ACTIVITIES_URL+`?longitude=${param.longitude}&latitude=${param.latitude}&page=${param.page}&rows=${param.rows}&userId=${param.userId}`;
    return this.httpService.get(urls).map((res) => res.json());
  }

  //获取城市信息
  getLocationCity() {
     return new Promise(resolve=>{
      let map, geolocation;
      //加载地图，调用浏览器定位服务
      map = new AMap.Map('container', {
        resizeEnable: true,
        zoom:15
      });

      let that = this;
      map.plugin('AMap.Geolocation', function () {
        geolocation = new AMap.Geolocation({
          enableHighAccuracy: true,//是否使用高精度定位，默认:true
          timeout: 10000          //超过10秒后停止定位，默认：无穷大
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        geolocation.getCityInfo(onCompleteOfCity);//返回城市信息
        AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
        AMap.event.addListener(geolocation, 'error', onError);//定位出错

        function onComplete(result){
          that.location.position=result.position;
          let autoCity=that.location.autoCity;
          if(autoCity!=null){
              Object.assign(autoCity,{
             "position":result.position
           })
          }
          that.currentCityName.next(that.location.autoCity.title);
          resolve(autoCity);
        }
        function onError(error){
          //  console.log(error)
           that.autoCity.subscribe((result)=>{
              // console.log(result);
              if(result!=null){
                resolve(result);
              }
           })
        }
        function onCompleteOfCity(status?, result?){
            if (status == 'complete') {
              that.getAreaByParentPostCode(result.adcode).then((autoCity:any)=>{
               that.location.autoCity=autoCity;
               that.location.currentCity=autoCity;
               if(autoCity!=null){
                  Object.assign(autoCity,{
                 "position":result.position
               })
              }
              that.autoCity.next(autoCity);
              that.currentCityName.next(autoCity.title);
              });
            }
            else {
              that.currentCityName.next('定位失败');
              that.toolsService.showToast('定位失败，请尝试手动定位')
            }
        }
      });
     })
  }
  //查询球类
  getSportType(obj: object): Observable<SNSResult<DictReversalVO>> {
    let url = this.SPORT_TYPE_URL;
    return this.httpService.get(url).map(res => res.json());
  }
  //根据邮编查询城市ID
  getAreaByParentPostCode(postcode: string){
    return new Promise((resolve,reject)=>{
      let url = this.POSTCODE_URL+'?parentPostCode='+postcode;
      this.httpService.get(url).map((res:Response) => res.json()).subscribe(res=>{
         if(res.result==='0'){
            let rangType = res.data;
          //按areaId排序
          let sortAfterRangTypes = rangType.sort((before, after) => {
            return before.areaId - after.areaId;
          });
          let autoCity=sortAfterRangTypes[0];//城市
          sortAfterRangTypes.shift();//删除城市
          let whole={
            "id": 1,
            "title": "全城",
            "areaId": autoCity.areaId
          }
          sortAfterRangTypes.unshift(whole);
          Object.assign(autoCity,{
            "areaList":sortAfterRangTypes
          })
          resolve(autoCity);
         }
      })
    })
  }

  /**
  * 约战部分
  */
  //查询同城约战列表
  getBookingMatch(obj):Observable<SNSResult<CommonPageVo<RespCityEngageVO>>>{
    let url = this.BOOKING_MATCH_URL+'?'+this.toolsService.param(obj);
    // let uri = $.param(obj);
    return this.httpService.get(url).map(res => res.json());
  }
   getBookingMatchDetail(obj):Observable<SNSResult<TeamEngageVO>>{
    let url = this.MATCH_DETAIL_URL+'?'+this.toolsService.param(obj);
    // let uri = $.param(obj);
    return this.httpService.get(url).map(res => res.json());
  }
//个人ip
  getPersonIp(data) {
    let url = this.PersonIp_Url + '?' + this.toolsService.params(data);
    return this.httpService.get(url).map(res => res.json());
  }
  //球队ip
  getTeamIp(data) {
    let url = this.TeamIp_Url + '?' +this.toolsService.params(data);
    return this.httpService.get(url).map(res => res.json())
  }

  //城市列表部分
  getHotCity(opt):Observable<SNSResult<DictVersionCityVO>> {
    let url = this.HOT_CITY_URL+'?'+this.toolsService.param(opt);
    return this.httpService.get(url).map(rs => rs.json());
  };
  getProCity(opt) {
    let url = this.PRO_CITY_URL + '?' + this.toolsService.param(opt);
    return this.httpService.get(url).map(rs => rs.json());
  };
  getCityArea(opt) {
    let url = this.CITY_AREA_URL+ '?' + this.toolsService.param(opt);
    return this.httpService.get(url).map(rs => rs.json());
  };
// 招募详情
  getRecruitDetail(id){
    let url = this.RecruitDetail_Url + '?teamRecruitId=' +id;
    return this.httpService.get(url).map(res => res.json())
}
  // 招募列表
  getRecruitList(obj) {
    let url = this.getRecruitListUrl;
    let params = this.toolsService.params(obj);
    return this.httpService.get(`${url}?${params}`).map(res => res.json());
  }
  //新增关注
  AddFollow(userid) {
    let url = this.ToFollow;
    let opt = { followUserId: userid }
    return this.httpService.postUrlencode(url, opt).map(rs => rs.json());
  }
}
