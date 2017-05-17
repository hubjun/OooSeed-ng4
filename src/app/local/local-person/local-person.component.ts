
import { Component, OnInit } from '@angular/core';
import {LocalService} from '../local.service'
import { Subscription } from "rxjs";
import {ToolsService} from "../../shared/tools/tools.service";
import {Router} from '@angular/Router';

@Component({
  selector: 'local-teamip',
  templateUrl: './local-person.component.html',
  styleUrls: ['./local-person.component.scss']
})
export class LocalPersonComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  public defaulticon:string=this.localService.defaulticon;// 默认头像
  public nofollow='../../../assets/images/subscript_icon_unfollow.png';//未关注
  public bothfollow='../../../assets/images/subscript_icon_isfollowboth.png'//互相关注
  public isfollow='../../../assets/images/subscript_icon_isfollow.png';//未关注
  public missCanSee:boolean=false;//missingpage显示
  public filterTypes = {
    userType:[],
    sortType: [{
      id: 1,
      title: "不限男女"
    }, {
      id: 2,
      title: "男"
    }, {
      id: 3,
      title: "女"
    }]
  };
  public personipdata = {
    rangType: 1,
    areaId: 11959,
    longitude: 0,
    latitude: 0,
    page:1,
    rows: 20,
    sex:null,
    ipCateId:null
  }
  public personIpList:any[]=[];
  public sexlist=[null,1,2];
  constructor(
    public localService: LocalService,
    public ToolServices:ToolsService,
    public router:Router
  ) {
    this.localService.filter.filterType.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则

    this.subscription.add(
      this.localService.filterResult.subscribe((filterReuslt: any) => {
        this.personipdata.ipCateId=filterReuslt.userType.ipCateId;
        this.personipdata.areaId=filterReuslt.rangType.areaId;
        this.personipdata.rangType=filterReuslt.rangType.id;
        this.personipdata.sex=this.sexlist[filterReuslt.sortType.index];
        let position = filterReuslt.rangType.position;
        if (position != null) {
          this.personipdata.longitude = position.getLng();
          this.personipdata.latitude = position.getLat();
        }
        this.getPersonIp();
      })
    );
  }
  getPersonIp() {
    this.ToolServices.showLoading();
    this.subscription.add(
      this.localService.getPersonIp(this.personipdata).subscribe((res) => {
        this.personIpList=res.data.list;
        this.ToolServices.hideLoading();
        res.data.list.length==0?this.missCanSee=true:this.missCanSee=false;
      })
    )
  }

  ToFollow(isfollow, userid) {
    this.ToolServices.presentConfirm('是否确认要关注？', 1,gofollow);
    let mythis=this;
    function gofollow(){
      if (isfollow == 0) {
        mythis.subscription.add(
          mythis.localService.AddFollow(userid).subscribe((res) => {
            if (res.result == 0) {
              mythis.getPersonIp();
            }else{
              mythis.ToolServices.presentConfirm('请检查是否已登陆！',1);
            }
          })
        )
      }
    }
  }
  goPersonalPage(userid){
   this.router.navigate(['./homepage/',userid]);
  }
  ngOnInit() {

  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();

  }
}
