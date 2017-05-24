import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {HomeService} from "../../../home/home.service";
import {Observable, Subject, Subscription} from "rxjs";
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
  public isActive:number = 0;
  public page:number = 1;
  public gallery  : Observable<AppPlayTurn[]>;
  public cates    : Observable<ArticleCate>;
  public articles : any;
  public cateId:ArticleVO;
  public _waitData:boolean;
  public  ele = document.querySelector('#seed-scroll-content');
  private ngUnsubscribe:Subject<void> = new Subject<void>();
  @ViewChild('cateEve') cateEve:ElementRef;
  @ViewChild('lastElement') lastElement;

  constructor(
    private homeService:HomeService,
    private tools:ToolsService,
    private mineSer:MineService,
    private authSer:AuthService,
  ) {

  }

  init(){
    this.tools.showLoading();
    let userId = this.authSer.getUserid();
    this.mineSer.getMyInfo(userId,1,10)
        .takeUntil(this.ngUnsubscribe)
        .subscribe(res =>{
          this.tools.hideLoading();
          if(res.result == '0'){
            this.articles = res.data.list;
          }
        })
  }
  onScroll(){
    if(this._waitData === false){
      this._waitData = true;
      this.homeService.GetCateArticles(this.cateId,this.page)
        .subscribe((res) => {
          if (res && res.result == 0) {
            this.page++;
            this._waitData = false;
            this.homeService.dataStore.articles = [...this.homeService.dataStore.articles,...res.data.list];
            this.homeService._articles.next(this.homeService.dataStore.articles);
          }
        });
    }

  }
  ngOnInit() {
    // this.homeService.GetBannerInfo();
    // this.homeService.GetCateInfo();
    this.init();
  }
  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
