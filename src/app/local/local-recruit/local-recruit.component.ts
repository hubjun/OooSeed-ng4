import {Component, OnInit,ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/Router';
import {LocalService} from '../local.service'
import {Subscription} from "rxjs";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'local-recruit',
  templateUrl: './local-recruit.component.html',
  styleUrls: ['./local-recruit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocalRecruitComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  public defaulticon:string=this.localService.defaulticon;// 默认头像
  public missCanSee:boolean=false;//missingpage显示
  public recruitObj: any[] = [];
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
  public params = {
    sportType: null,
    rangType: 1,
    sortType: null,
    areaId: null,
    longitude:0,
    latitude:0,
    pages: 1,
    rows: 10
  };

  constructor(public router: Router,
              public localService: LocalService,
              public ToolServices:ToolsService
  ) {
    this.subscription.add(
      this.localService.filterResult.subscribe((filterReuslt: any) => {

        this.params.sportType=filterReuslt.sportType.id;
        this.params.areaId=filterReuslt.rangType.areaId;
        this.params.rangType=filterReuslt.rangType.id;
        this.params.sortType=filterReuslt.sortType.id;
        let position = filterReuslt.rangType.position;
        if (position != null) {
          this.params.longitude = position.getLng();
          this.params.latitude = position.getLat();
        }
        this.getRecruitListInfo(this.params);
      })
    );
  }

  getRecruitListInfo(params) {
    this.ToolServices.showLoading();
    this.subscription.add(
      this.localService.getRecruitList(params)
        .subscribe(res => {
          if (res.result === '0') {

            this.recruitObj = res.data.list;
            this.ToolServices.hideLoading();
            res.data.list.length==0?this.missCanSee=true:this.missCanSee=false;
          }
        })
    )
  }

  goRecruitDetail(id) {
    this.router.navigate(['/local/recruit-detail', id]);

  }
  TipCommon(){
    this.ToolServices.presentConfirm('下载求苗APP，看更多精彩内容！');
  }

  ngOnInit() {
    this.localService.filter.filterType.emit(this.filterTypes);//向排序组件传送相应栏目对应的排序规则

  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.ToolServices.hideLoading();
  }
}
