/**
 * Created by dell on 2017/5/12.
 */
import {Component, OnInit, Input}from'@angular/core';
import {Router, ActivatedRoute}from '@angular/router';
import {componentFactoryName} from "@angular/compiler";

@Component({
  selector: 'schedule-list',
  template: `
    <div class="schedulelist">
      <div class="module-title">
        拼球
      </div>
      <ul>
        <li *ngFor="let schedule of schedules" (click)="goToSpellDetail(schedule)">
          <div class="time">
            <div class="start-time">{{schedule.startTime}}</div>
            <div class="end-time">{{schedule.endTime}}</div>
          </div>
          <div class="other">
            <div class="title">{{schedule.title}}</div>
            <div class="date">{{schedule.scheduleDate}}</div>
          </div>
        </li>
      </ul>
    </div>

  `,
  styleUrls: ['./my-component.scss']
})

export class MyComponent implements OnInit {
  @Input() schedules: Array<any>;

  constructor() {

  }

  goToSpellDetail() {

  }

  ngOnInit() {

  }
}
