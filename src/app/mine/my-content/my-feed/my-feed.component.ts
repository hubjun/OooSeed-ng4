import { Component, OnInit } from '@angular/core';
import { ToolsService } from '../../../shared/tools/tools.service';
import { AuthService } from '../../../shared/service/auth.service';
import { MineService } from '../../../mine/mine.service';
import { Subject, Observable, BehaviorSubject } from 'Rxjs';
import { FeedRespVO } from '../../../domain/interface.model';


@Component({
  selector: 'my-digg',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.scss']
})
export class MyFeedComponent implements OnInit {
  // feeds: any;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private _feeds:BehaviorSubject<FeedRespVO[]> = new BehaviorSubject<FeedRespVO[]>([]);
  constructor(
    private tools: ToolsService,
    private authSer: AuthService,
    private mineSer: MineService,
  ) { }

  ngOnInit() {
    this.init();
    console.log(this.feeds)
  }
  init() {
    this.tools.showLoading();
    let userId = this.authSer.getUserid();
    this.mineSer.getMyFeed(userId, 1, 10)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.tools.hideLoading();
        if (res.result == '0') {
          let temp = [...res.data.list]; 
          this._feeds.next(temp);
        }
      })
  }
  get feeds(){
   return this._feeds.asObservable();
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
