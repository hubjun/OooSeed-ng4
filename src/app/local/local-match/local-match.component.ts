import { Component, OnInit } from '@angular/core';
import { LocalService } from '../local.service';
import { Subscription } from 'rxjs';
import { RespCityEngageVO } from '../../domain/interface.model';
import { ToolsService } from '../../shared/tools/tools.service';
import { Router } from "@angular/router";
@Component({
  selector: 'local-match',
  templateUrl: './local-match.component.html',
  styleUrls: ['../local-spell/local-spell.component.scss']
})
export class LocalMatchComponent {
  private subscription: Subscription = new Subscription();
  private matchs: Array<RespCityEngageVO> = [];
  private sportTypeId: number;
  private haveMore: boolean = false;
  private haveData: boolean = true;

  private defaultTeamIcon = this.localService.defaultTeamIcon;
  public filterTypes: object = {
    sortType: [{
      id: 1,
      title: "默认"
    }, {
      id: 2,
      title: "费用类型"
    }, {
      id: 3,
      title: "开始时间"
    }, {
      id: 4,
      title: "最新发布"
    }]
  }

  constructor(
    private localService: LocalService,
    private toolsService: ToolsService,
    private router: Router
  ) {
    //发送自有排序规则
    this.localService.filter.filterType.emit(this.filterTypes);

    //根据排序规则处理请求
    this.subscription.add(
      this.localService.filterResult.subscribe((filterReuslt: any) => {
        let position = filterReuslt.rangType.position;
        if (filterReuslt != null) {
          let result = {
            sporyType: filterReuslt.sportType.id,
            rangType: filterReuslt.rangType.id,
            areaId: filterReuslt.rangType.areaId,
            sortType: filterReuslt.sortType.id,
            longitude: 0,
            latitude: 0,
            pages: 1,
            rows: 10
          }
          if (position != undefined || position != null) {
            result.longitude = position.getLng();
            result.latitude = position.getLat();
          }
          result.sortType = filterReuslt.sortType.id != null ? filterReuslt.sortType.id : 1;//1.默认
          this.getBookingMatch(result);
        }
      })
    )
  }
  //获取同城约战列表
  getBookingMatch(filterResult: any) {
    this.localService.getBookingMatch(filterResult).subscribe((res) => {
      this.toolsService.hideLoading();
      if (res.result === '0') {
        let matchs: any = res.data.list;
        this.matchs = matchs;
        this.haveMore = res.data.hasNextPage;
        matchs.length > 0 ? this.haveData = true : this.haveData = false;
      }
    })
  }
  goToTeamHomePage() {

  }
  goToMatchDetailPage(id: number) {
    this.router.navigate(['/local/booking-match', id]);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
