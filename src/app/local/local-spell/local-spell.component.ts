import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LocalService} from "../local.service";
import {ToolsService} from "../../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";
import {Router} from "@angular/router";

@Component({
  selector: 'spell-chanel',
  templateUrl: './local-spell.component.html',
  styleUrls: ['./local-spell.component.scss'],
  // changeDetection:ChangeDetectionStrategy.OnPush
})

export class LocalSpellComponent {
  public defaulticon = 'assets/icon/concern_default_head.png';
  public spellData:any;
  public lessLength:any;
  public locationError:string;
  subscription: Subscription = new Subscription();
  public param:any={
    sportType:'',
    orderId:'',
    cityId:'',
    raidus:'',
    areaId:'',
    longitude: this.localService.coor.long,
    latitude: this.localService.coor.lat,
    page:1,
    rows: 10
  };

  public filterTypes = {
    sortType: [{
      id: 1,
      title: "默认"
    }, {
      id: 2,
      title: "费用低到高"
    }, {
      id: 3,
      title: "开始时间"
    }, {
      id: 4,
      title: "最新发布"
    }]
  };

  constructor(
    private router: Router,
    public localService: LocalService,
    public ToolServices:ToolsService
  ) {
    //按排序规则排序
    this.localService.filter.filterType.emit(this.filterTypes);
    this.subscription.add(
      this.localService.filterResult.subscribe((filterReuslt: any) => {
        if(filterReuslt.rangType.areaId==null){
          this.locationError='error';
          if(!localStorage.getItem('locationError')){
            this.ToolServices.presentConfirm('定位出错啦~',1);
            localStorage.setItem('locationError','error');
          }
          this.doDataSpellInfo(this.param);
        }else{
          this.param.sportType=filterReuslt.sportType.id==null?'':filterReuslt.sportType.id;
          this.param.orderId=filterReuslt.sortType.id==null||filterReuslt.sortType.id==1?'':filterReuslt.sortType.id-1;
          this.param.cityId=filterReuslt.rangType.id==1?filterReuslt.rangType.areaId:'';
          this.param.raidus=filterReuslt.rangType.id==2?50000:'';
          this.param.areaId=filterReuslt.rangType.id==3?filterReuslt.rangType.areaId:'';
          if(filterReuslt.rangType.position==undefined||filterReuslt.rangType.position==null){
            this.param.longitude=0;
            this.param.latitude=0;
            this.locationError='error';
          }else{
            this.param.longitude=filterReuslt.rangType.position.lng;
            this.param.latitude=filterReuslt.rangType.position.lat;
          }
          this.doDataSpellInfo(this.param);
        }
      })
    );
  }

  doDataSpellInfo(obj){
    this.ToolServices.showLoading();
    this.localService.getSpellInfo(obj).subscribe((res)=>{
      if(res.result==0 && res.data.list){
        this.spellData=res.data.list;
        this.ToolServices.hideLoading();
      }
    });
  }

  TipCommon(){
    this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
  }

  goToSpellDetail(obj){
    this.router.navigate(['/local/spell-detail', obj]);
  }

  goPersonalPage(obj){
    this.router.navigate(['/homepage', obj]);
  }

  ngOnInit() {
    this.ToolServices.showLoading();
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }
}
