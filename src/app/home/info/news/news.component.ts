import {Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ArticleVO, ArticleCommentVO} from "../../../domain/interface.model";
import {HomeService} from "../../home.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import  {Subject} from "rxjs";

@Component({
  selector: 'seed-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnDestroy, OnInit {
  articleId:ArticleVO;
  article:ArticleVO[] = [];
  comments :ArticleCommentVO[] = [];
  private ngUnsubscribe:Subject<void> = new Subject<void>();

  constructor(
    private router:Router,
    private tools:ToolsService,
    private route:ActivatedRoute,
    private homeService:HomeService,
  ) {

    this.router.events
      .takeUntil(this.ngUnsubscribe)
      .subscribe((path) => {
        this.tools.scrollTop();
      })
  }


  ngOnInit() {
    this.route.params
      .switchMap((params:Params) => this.homeService.GetCateArticleInfo(params['articleId']))
      .takeUntil(this.ngUnsubscribe)
      .subscribe((res) => {
        this.article= res.data;
        this.homeService
          .GetCateArticleListRecommend(res.data.cateId)
          .takeUntil(this.ngUnsubscribe)
          .subscribe((res) => {
          if(res && res.result == 0) {
            this.comments = [...res.data];
          }
        })
      })
  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
