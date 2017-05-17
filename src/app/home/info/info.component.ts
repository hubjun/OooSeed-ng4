import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {HomeService} from "../home.service";
import {Observable, Subject} from "rxjs";
import {AppPlayTurn, ArticleCate, ArticleVO} from "../../domain/interface.model";
import {ToolsService} from "../../shared/tools/tools.service";
import {HttpService} from "../../core/http.service";

@Component({
  selector: 'seed-home-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],

})
export class InfoComponent implements OnInit {
  public isActive:number = 0;
  public gallery  : Observable<AppPlayTurn[]>;
  public cates    : Observable<ArticleCate>;
  public articles : Observable<ArticleVO[]>;
  public cateType$:Subject<number>= new Subject<number>();
  public eventStates:boolean = true;

  @ViewChild('cateEve') cateEve:ElementRef;
  @ViewChild('lastElement') lastElement;
  constructor(
    private homeService:HomeService,
    private tools:ToolsService,
    private httpService:HttpService
  ) {
    this.gallery = this.homeService.banners;
    this.cates = this.homeService.cates;
    this.articles = this.homeService.articles;
    this.cateType$
      .distinctUntilChanged()
      .switchMap((cateId:number) => {
        let url =  `/article/articles?categoryId=${cateId}&page=1&rows=10`;
        return this.httpService.get(url)
      }) .map((res) => res.json())
      .subscribe((res) => {
        this.homeService.dataStore.articles = [...res.data.list];
        this.homeService._articles.next(this.homeService.dataStore.articles);
      });
  }

  onFirstClick() {
    if(this.eventStates) {
      this.cateEve.nativeElement.children[0].click();
      this.eventStates = false;
    }
  }

  ngOnInit() {
    this.homeService.GetBannerInfo();
    this.homeService.GetCateInfo();
  }

}
