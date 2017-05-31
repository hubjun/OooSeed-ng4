import {Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router, Params} from "@angular/router";
import {ArticleVO, ArticleCommentVO} from "../../../domain/interface.model";
import {HomeService} from "../../home.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import  {Subject} from "rxjs";
import {Content} from "../../../shared/components/toolbar/toolbar-content";


@Component({
  selector: 'seed-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnDestroy, OnInit {
  articleId:ArticleVO;
  article:ArticleVO = {};
  comments :ArticleCommentVO[] = [];
  recommend:ArticleVO[] = [];
  @ViewChild(Content) content;
  public ngUnsubscribe:Subject<void> = new Subject<void>();
  constructor(
    public router:Router,
    public tools:ToolsService,
    public route:ActivatedRoute,
    public homeService:HomeService,
  ) {}


  ngOnInit() {
    this.route.params
      .takeUntil(this.ngUnsubscribe)
      .switchMap((params:Params) =>
        this.homeService.GetCateArticleInfo(params['articleId'])
      )
      .subscribe((res) => {
        if(res && res.result == 0) {
          this.article= res.data;
          this.content.scrollTop();
          this.homeService.GetCateArticleListComment(this.article.articleId)
            .subscribe(res => {
              if(res && res.result == 0 && res.data.list.length > 0) {
                this.comments = [...res.data.list]
              }
            })

          this.homeService.GetCateArticleListRecommend(res.data.cateId,res.data.articleId)
            .takeUntil(this.ngUnsubscribe)
            .subscribe((res) => {
              if(res && res.result == 0) {
                this.recommend = [...res.data];
                console.log(this.recommend)
              }
            })
        }
      })

  }

  ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
