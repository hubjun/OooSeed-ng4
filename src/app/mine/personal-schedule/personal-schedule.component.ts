/**
 * Created by dell on 2017/5/12.
 */
import {Component,OnInit}from'@angular/core';
import {Router,ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";
import {MineService} from '../mine.service'
import {UserDataService} from '../../shared/tools/user-data.service'

@Component({
  selector: 'my-content',
  templateUrl: './personal-schedule.component.html',
  styleUrls: ['./personal-schedule.component.scss']
})

export class PersonalScheduleComponent implements OnInit {
  TodySchedules:Array<any>=[
    {
      "endTime": "17:00",
      "remark": "拼球",
      "scheduleDate": "2017.07.01 周六",
      "scheduleId": 558,
      "startTime": "16:00",
      "tableId": 114,
      "title": "拼球：足球，六人制"
    },
    {
      "endTime": "17:00",
      "remark": "拼球",
      "scheduleDate": "2017.07.01 周六",
      "scheduleId": 558,
      "startTime": "16:00",
      "tableId": 114,
      "title": "拼球：足球，六人制"
    }
  ]
  LatelySchedules:Array<any>=[
    {
      "endTime": "17:00",
      "remark": "拼球",
      "scheduleDate": "2017.07.01 周六",
      "scheduleId": 558,
      "startTime": "16:00",
      "tableId": 114,
      "title": "拼球：足球，六人制 科兴长脚足球场"
    },
    {
      "endTime": "17:00",
      "remark": "拼球",
      "scheduleDate": "2017.07.01 周六",
      "scheduleId": 558,
      "startTime": "16:00",
      "tableId": 114,
      "title": "拼球：足球，六人制"
    },
    {
      "endTime": "17:00",
      "remark": "拼球",
      "scheduleDate": "2017.07.01 周六",
      "scheduleId": 558,
      "startTime": "16:00",
      "tableId": 114,
      "title": "拼球：足球，六人制"
    },
    {
      "endTime": "17:00",
      "remark": "拼球",
      "scheduleDate": "2017.07.01 周六",
      "scheduleId": 558,
      "startTime": "16:00",
      "tableId": 114,
      "title": "拼球：足球，六人制"
    }
  ]
  constructor(
    public mineservice:MineService,
    private userservice:UserDataService
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
    this.mineservice.getUserNewestSchedule(params).subscribe((res) => {
      if (res.result === '0') {
        this.TodySchedules = res.data;
        console.log(res);
      }
    })
  }
  //获取用户最近日程
  getUserLatestSchedule() {
    this.mineservice.getUserLatestSchedule().subscribe((res) => {
      if (res.result === '0') {
        this.LatelySchedules = res.data;
        console.log(res);
      }
    })
  }
  ngOnInit(){
    this.getUserLatestSchedule();
    this.getUserNewestSchedule();
  }
}
