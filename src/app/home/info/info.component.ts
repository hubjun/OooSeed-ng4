import {Component, OnInit, ViewChild, ElementRef, Input} from '@angular/core';
import {HomeService} from "../home.service";
import {Observable, Subject} from "rxjs";
import {AppPlayTurn, ArticleCate, ArticleVO} from "../../domain/interface.model";
import {ToolsService} from "../../shared/tools/tools.service";
import {Content} from "../../shared/components/toolbar/toolbar-content";

@Component({
  selector: 'seed-home-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],

})
export class InfoComponent implements OnInit {
  @Input() content;
  public isActive:number = 0;
  public page:number = 1;
  public gallery  : Observable<AppPlayTurn[]>;
  public cates    : Observable<ArticleCate>;
  public articles : Observable<ArticleVO[]>;
  public cateType$:Subject<ArticleVO>= new Subject<ArticleVO>();
  public eventStates:boolean = true;
  public cateId:ArticleVO;
  public _waitData:boolean;
  public  ele = document.querySelector('#seed-scroll-content');
  @ViewChild('cateEve') cateEve:ElementRef;
  @ViewChild('lastElement') lastElement;

  constructor(
    public homeService:HomeService,
    public tools:ToolsService,
  ) {
    this.gallery = this.homeService.banners;
    this.cates = this.homeService.cates;
    this.articles = this.homeService.articles;
    this.cateType$
      .distinctUntilChanged()
      .switchMap((cateId:ArticleVO) => {
        this.cateId = cateId;
        return this.homeService.GetCateArticles(cateId)
      })
      .subscribe((res) => {
        if (res && res.result == 0) {
          this.page++;
          this._waitData = false;
          this.homeService.dataStore.articles = [...res.data.list];
          this.homeService._articles.next(this.homeService.dataStore.articles);

        }
      });
  }

  onFirstClick() {
    if(this.eventStates) {
      let index = this.homeService.infoStore['index'];
      this.cateEve.nativeElement.children[index].click();
      document.querySelector('.seed-scroll').scrollLeft = this.homeService.infoStore['postion'];
      this.eventStates = false;
    }
  }

  chooseCate(cateId:ArticleVO,index,$event){
    this.cateType$.next(cateId);
    this.page = 1;
    this.isActive = index;
    this.homeService.infoStore['index'] = this.isActive;
    this.homeService.infoStore['postion'] = $event.target.offsetLeft || 0;
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
    this.homeService.GetBannerInfo();
    this.homeService.GetCateInfo();
  }

}
