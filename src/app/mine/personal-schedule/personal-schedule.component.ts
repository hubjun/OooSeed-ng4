/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../mine.service'
import {UserDataService} from '../../shared/tools/user-data.service'
import {Subscription} from "rxjs";
import {ToolsService} from '../../shared/tools/tools.service';

@Component({
  selector: 'my-content',
  templateUrl: './personal-schedule.component.html',
  styleUrls: ['./personal-schedule.component.scss']
})

export class PersonalScheduleComponent implements OnInit {
  public TodySchedules:Array<any>=[];
  public LatelySchedules:Array<any>=[];
  public subscription: Subscription = new Subscription();
  constructor(
    public mineservice:MineService,
    private userservice:UserDataService,
    public toolservice: ToolsService
  ){

  }
  //获取用户今日日程
  getUserNewestSchedule() {
    let date = new Date();
    let Y, D, M;
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    let param = Y + M + D;
    let params: any = {
      eventDate: param
    }
    this.subscription.add(
    this.mineservice.getUserNewestSchedule(params).subscribe((res) => {
      if (res.result === '0') {
        this.TodySchedules = res.data;
        console.log(res);
      }
    })
    )
  }
  //获取用户最近日程
  getUserLatestSchedule() {
      this.toolservice.showLoading();
    this.subscription.add(
    this.mineservice.getUserLatestSchedule().subscribe((res) => {
      if (res.result === '0') {
        this.LatelySchedules = res.data;
        this.toolservice.hideLoading();
        console.log(res);
      }
    })
    )
  }
  ngOnInit(){
    this.getUserLatestSchedule();
    this.getUserNewestSchedule();
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
    this.toolservice.hideLoading();
  }
}
