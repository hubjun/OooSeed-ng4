/**
 * Created by dell on 2017/5/5.
 */
import {Component, OnInit} from '@angular/core';
import {LocalService} from '../local.service';
import {Subscription} from "rxjs";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'local-teamip',
  templateUrl: './local-team.component.html',
  styleUrls: ['./local-team.component.scss']
})
export class LocalTeamComponent implements OnInit {
  public subscription: Subscription = new Subscription();
  public defaulticon: string = this.localService.defaulticon;// 默认头像
  public nofollow = '../../assets/images/subscript_icon_unfollow.png';//未关注
  public bothfollow = '../../assets/images/subscript_icon_isfollowboth.png'//互相关注
  public isfollow = '../../assets/images/subscript_icon_isfollow.png';//未关注
  public missCanSee: boolean = false;//missingpage显示
  public filterTypes = {
    rangType: [{
      id: 1,
      title: "城市"
    }, {
      id: 2,
      title: "附近"
    }, {
      id: 3,
      title: "区县"
    }],
    sortType: [{
      id: null,
      title: "全部"
    }, {
      id: 2003,
      title: "11人制"
    }, {
      id: 2002,
      title: "6-8人制"
    }, {
      id: 2001,
      title: "3-5人制"
    }]
  }
  public teamipdata = {
    rangType: 1,
    areaId: 11959,
    longitude:0,
    latitude:0,
    pages: 1,
    rows: 20,
    formatId: null,
    sportType: null
  };
  public teamIpList: any[] = [];

  constructor(public localService: LocalService,
              public ToolServices: ToolsService)
  {
    this.subscription.add(
      this.localService.filterResult.subscribe((filterReuslt: any) => {
        this.teamipdata.sportType=filterReuslt.sportType.id;
        this.teamipdata.areaId=filterReuslt.rangType.areaId;
        this.teamipdata.rangType=filterReuslt.rangType.id;
        this.teamipdata.formatId=filterReuslt.sortType.id;
        let position = filterReuslt.rangType.position;
        if (position != null) {
          this.teamipdata.longitude = position.getLng();
          this.teamipdata.latitude = position.getLat();
        }
        this.getTeamIp();
      })
    );
  }

  getTeamIp() {
    this.ToolServices.showLoading();
    this.subscription.add(
      this.localService.getTeamIp(this.teamipdata).subscribe((res) => {
        this.teamIpList = res.data.list;
        this.ToolServices.hideLoading();
        res.data.list.length == 0 ? this.missCanSee = true : this.missCanSee = false;
      })
    )
  }

  ToFollow(isfollow, userid) {
    this.ToolServices.presentConfirm('是否确认要关注？', 1,gofollow);
    let mythis=this;
    function gofollow(){
      if (isfollow == 1 || isfollow == 3) {
        mythis.subscription.add(
          mythis.localService.AddFollow(userid).subscribe((res) => {
            if (res.result == 0) {
              mythis.getTeamIp();
            }else{
              mythis.ToolServices.presentConfirm('请检查是否已登陆！',1);
            }
          })
        )
      }
    }

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
