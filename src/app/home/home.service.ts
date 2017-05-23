/**
 * Created by chenwenhao on 2017/1/13.
 */
import {Injectable} from '@angular/core';
import {Response} from "@angular/http";
import {HttpService} from "../core/http.service";
import {AppPlayTurn, ArticleCate, ArticleVO, FeedRespVO, FeedCommentRespVO} from "../domain/interface.model";
import {BehaviorSubject} from "rxjs";
import 'rxjs/add/operator/toPromise';
@Injectable()
export class HomeService {

  private RECOMMEND_URL = '/ip/cate/home';
  private RECOMMEND_IP_URL = '/ip/recom';  //首页推荐IP列表
  private RECOMMEND_CHANNEL_URL = '/ip/cate/home'; //首页栏目列表
  private INFO_BANNER_URL = '/file/playturn';
  private INFO_CATE_URL = '/article/cate';
  public  INFO_CATE_ARTICLES_URL = '/article/articles';
  private INFO_CATE_ARTICLE_URL = '/article/article';
  private INFO_CATE_ARTICLE_LIST_RECOMMEND_URL = '/article/article/acticleList/recom';
  private INFO_CATE_ARTICLE_LIST_COMMENT_URL = '/article/article/comment';
  private FEED_GUEST_URL = '/feed/_guest';
  private FEED_ARTICLE_URL = '/feed';
  private FEED_ARTICLE_COMMENT_URL = '/feed/comment';
  private FEED_ARTICLE_DIGG_URL = '/user/feed/digg';
  private FEED_ARTICLE_COMMENT_DIGG_URL = '/user/comment/digg';
  private _banners:BehaviorSubject<AppPlayTurn[]> = new BehaviorSubject<AppPlayTurn[]>([]) ;
  private _cates:BehaviorSubject<ArticleCate> = new BehaviorSubject<ArticleCate>({});
  public  _articles:BehaviorSubject<ArticleVO[]> = new BehaviorSubject<ArticleVO[]>([]);
  private _news:BehaviorSubject<ArticleVO[]> = new BehaviorSubject<ArticleVO[]>([]);
  private _feeds:BehaviorSubject<FeedRespVO[]> = new BehaviorSubject<FeedRespVO[]>([]);
  private _feed:BehaviorSubject<FeedRespVO> = new BehaviorSubject<FeedRespVO>({});
  private _feedComment:BehaviorSubject<FeedCommentRespVO > = new BehaviorSubject<FeedCommentRespVO >({});
  public dataStore = {
    banners :[] = [],
    cates   :{} = {},
    articles:[] = [],
    news    :[] = [],
    feeds   :[] = [],
    feed    :[] = [],
    feedComment:[] = [],
  };
  public infoStore = {};


  constructor(
    private httpService: HttpService
  ) {
    this.infoStore['index'] = 0;
    this.infoStore['postion'] = 0;
  }

  //获取首页推荐IP列表
  getRecommendIP() {
    let url = this.RECOMMEND_IP_URL + '?page=1&rows=10';
    return this.httpService.get(url).map((res: Response) => res.json())
  }

  //获取首页推荐栏目
  getRecomentChannel() {
    let url = this.RECOMMEND_CHANNEL_URL
    return this.httpService.get(url).map((res: Response) => res.json())
  }

  GetRecommendInfo() {
    let url = this.RECOMMEND_URL;
    return this.httpService.get(url).map((res: Response) => res.json());
  }
  get banners(){
    return this._banners.asObservable();
  }
  GetBannerInfo() {
    let url = this.INFO_BANNER_URL + '?resPosition=6001&rows=5';
    this.httpService
      .get(url)
      .map((res: Response) => res.json())
      .subscribe( (res) => {
        this.dataStore.banners = [...res.data.list];
        this._banners.next(this.dataStore.banners);
    });
  }
  get cates(){
    return this._cates.asObservable();
  }
  GetCateInfo() {
    let url = this.INFO_CATE_URL;
    this.httpService
      .get(url)
      .map((res: Response) => res.json())
      .subscribe((res) => {
        this.dataStore.cates = res.data;
        this._cates.next(this.dataStore.cates);
      })
  }
  get articles() {
    return this._articles.asObservable();
  }
//获取资讯cate分类下的文章描述
  LoadCateArticles(categoryId:any, page: number = 1, rows: number = 10) {
    let url = this.INFO_CATE_ARTICLES_URL + `?categoryId=${categoryId}&page=${page}&rows=${rows}`;
    this.httpService.get(url)
  }
  GetCateArticles(categoryId:ArticleVO, page: number = 1, rows: number = 10) {
    let url = this.INFO_CATE_ARTICLES_URL + `?categoryId=${categoryId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((res: Response) => res.json())
  }

  get news() {
    return this._news.asObservable();
  }
//获取资讯cate分类下的文章描述的文章详细内容
  GetCateArticleInfo(articleId: ArticleVO) {
    let url = this.INFO_CATE_ARTICLE_URL + `?articleId=${articleId}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  //获取资讯cate分类下的文章描述的文章详细内容下的推荐文章
  GetCateArticleListRecommend(cateId : ArticleVO,articleId:ArticleVO) {
    let url = this.INFO_CATE_ARTICLE_LIST_RECOMMEND_URL + `?categoryId=${cateId }&articleId=${articleId}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  //获取资讯cate分类下的文章描述的文章详细内容下的评论
  GetCateArticleListComment(articleId: number, page: number = 1, rows: number = 3) {
    let url = this.INFO_CATE_ARTICLE_LIST_COMMENT_URL + `?articleId=${articleId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }


  /**
   *
   * @description 获取帖子相关数据
   *
   */
  get feeds(){
    return this._feeds.asObservable()
  }
  GetFeedForGuest(page:number = 1,rows:number = 10) {
    let url = this.FEED_GUEST_URL;
    this.httpService
      .get(`${url}?page=${page}&rows=${rows}`)
      .map((res: Response) => res.json())
      .subscribe((res) => {
        this.dataStore.feeds = [...res.data.list];
        this._feeds.next(this.dataStore.feeds);
      })
  }

  get feedArticle(){
    return this._feed.asObservable()
  }
  GetFeedArticle(feedId: FeedRespVO ) {
    let url = this.FEED_ARTICLE_URL + `?feedId=${feedId}`;
    this.httpService
      .get(url)
      .flatMap((resp:Response) => {
        let res = resp.json()
        if (res && res.result == 0) {
          this.dataStore.feed = res.data;
          this._feed.next(this.dataStore.feed)
        }
        return this.GetFeedArticleComment(feedId,1)
    }).subscribe(res => {

      if (res && res.result == 0) {
        this.dataStore.feedComment = [...res.data.list];
        this._feedComment.next(this.dataStore.feedComment)
      }
    })
  }

 /* GetFeedArticle(feedId: FeedRespVO ) {
    let url = this.FEED_ARTICLE_URL + `?feedId=${feedId}`;
    this.httpService
      .get(url)
      .map((res:Response) => {
        res.json();
        return Observable.of(res);
      })
      .subscribe((res) => {
        if (res && res.result == 0) {
          this.dataStore.feed = res.data;
          this._feed.next(this.dataStore.feed)
        }

      })
  }*/
  get feedComment(){
    return this._feedComment.asObservable();
  }
  GetFeedArticleComment(feedId: FeedRespVO, page: number, rows: number = 10) {
    let url = this.FEED_ARTICLE_COMMENT_URL + `?feedId=${feedId}&page=${page}&rows=${rows}`;
    return this.httpService.get(url).map((res: Response) => res.json());
  }

  GetFeedDigg(feedId:number,userId:string,operation:boolean = true){
    let data = {
      feedId :feedId,
      userId : userId
    };

    if (operation){
      let url = this.FEED_ARTICLE_DIGG_URL;
      return this.httpService.post(url,data).map((res) => res.json());

    }else {
      let url = this.FEED_ARTICLE_DIGG_URL + `?feedId=${feedId}&userId=${userId}`;
      return this.httpService.delete(url).map((res: Response) => res.json());
    }
  }

  GetFeedArticleCommentDigg(commentId: number,userId:string,operation:boolean = true) {
    let data = {
      userId    : userId,
      commentId : commentId
    };
    if (operation) {
      let url = this.FEED_ARTICLE_COMMENT_DIGG_URL;
      return this.httpService.postUrlencode(url,data).map((res: Response) => res.json());
    }else {
      let url = this.FEED_ARTICLE_COMMENT_DIGG_URL + `?userId=${userId}&commentId=${commentId}`;
      return this.httpService.delete(url).map((res: Response) => res.json());
    }
  }



}
