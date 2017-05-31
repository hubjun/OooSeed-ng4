import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToolsService } from '../../../shared/tools/tools.service';
import { AuthService } from '../../../shared/service/auth.service';
import { MineService } from '../../../mine/mine.service';
import { Subject, Observable, BehaviorSubject } from 'Rxjs';
import { FeedRespVO } from '../../../domain/interface.model';


@Component({
  selector: 'my-digg',
  templateUrl: './my-digg.component.html',
  styleUrls: ['./my-digg.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyDiggComponent implements OnInit {
  // feeds: any;
  public ngUnsubscribe: Subject<void> = new Subject<void>();
  public _feeds:BehaviorSubject<FeedRespVO[]> = new BehaviorSubject<FeedRespVO[]>([]);
  public ele: any;
  public userId: string = '';
  public page: number = 1;
  public canScroll: boolean =true;
  public scrolling: boolean =false;
  public noInfo: boolean =false;
  public loading: boolean =true;
  public tempArr = [];
  constructor(
    public tools: ToolsService,
    public authSer: AuthService,
    public mineSer: MineService,
  ) { }

  ngOnInit() {
    this.init();
    console.log(this.feeds)
  }
  init() {
    this.ele = document.querySelector('#seed-scroll-content');
    this.tools.showLoading();
    this.userId = this.authSer.getUserid();
    this.mineSer.getMyDigg(this.userId, this.page++, 10)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.tools.hideLoading();
        this.loading = false;
        if (res.result == '0') {
          if(res.data.list.length == 0){
              this.noInfo = true;
              return;
          }
          this.tempArr = [...res.data.list];
          this._feeds.next(this.tempArr);
        }else{
          this.noInfo = true;
        }
      })
  }
  onScroll(){
    if(!this.canScroll || this.scrolling){
      return;
    }
    this.scrolling = true;
    this.mineSer.getMyDigg(this.userId, this.page++, 10)
      .takeUntil(this.ngUnsubscribe)
      .subscribe(res => {
        this.tools.hideLoading();
        this.scrolling = false;
        if (res.result == '0') {
          this.tempArr = [...this.tempArr,...res.data.list];
          this._feeds.next(this.tempArr);
          if(this.tempArr.length >= res.data.total){
              this.canScroll = false;
              return;
          }
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
