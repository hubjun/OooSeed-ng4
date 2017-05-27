import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {HomeService} from "../../../home/home.service";
import {Observable, Subject, Subscription, BehaviorSubject} from "rxjs";
import {AppPlayTurn, ArticleCate, ArticleVO} from "../../../domain/interface.model";
import {ToolsService} from "../../../shared/tools/tools.service";
import {Content} from "../../../shared/components/toolbar/toolbar-content";
import {MineService} from '../../mine.service';
import {AuthService} from '../../../shared/service/auth.service';

@Component({
  selector: 'my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.scss']
})
export class MyInfoComponent implements OnInit {

  @Input() content;
  public page:number = 1;
  // public articles : any;
  public _waitData:boolean;
  public  ele: any;
  public ngUnsubscribe:Subject<void> = new Subject<void>();
  public _articles: BehaviorSubject<ArticleVO[]> = new BehaviorSubject<ArticleVO[]>([]);
  public userId: string = '';
  public tempArr = [];
  public canScroll: boolean = true;
  public scrolling: boolean = true;
  constructor(
    public homeService:HomeService,
    public tools:ToolsService,
    public mineSer:MineService,
    public authSer:AuthService,
  ) {

  }

  init(){
    this.ele = document.querySelector('#seed-scroll-content');
    this.tools.showLoading();
    this.userId = this.authSer.getUserid();
    this.mineSer.getMyInfo(this.userId,this.page++,10)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res =>{
          this.tools.hideLoading();
          if(res.result == '0'){
            this.tempArr = [...res.data.list];
             this._articles.next(this.tempArr);
          }
        })
  }
  get articles(){
    return this._articles.asObservable();
  }
  onScroll(){
    if(!this.canScroll || this.scrolling){
      return;
    }
    this.scrolling = true;
    this.mineSer.getMyInfo(this.userId,this.page++,10)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res =>{
          this.tools.hideLoading();
          this.scrolling = false;
          if(res.result == '0'){
             this.tempArr = [...this.tempArr,...res.data.list];
             this._articles.next(this.tempArr);
             if(this.tempArr.length >= res.data.total){
              this.canScroll = false;
              return;
            }
          }
        })

  }
  ngOnInit() {
    this.init();
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
