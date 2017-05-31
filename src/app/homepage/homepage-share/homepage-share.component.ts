
import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation,ViewChild} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";
import {Observable} from "rxjs";
import {FeedRespVO, UserAlbumFileVO, UserInfoVO} from "../../domain/interface.model";


@Component({
  selector: 'person-share',
  templateUrl: './homepage-share.component.html',
  styleUrls: ['./homepage-share.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomepageShareComponent implements OnInit {
  public _content;
  public src:string;
  public poster:string;
  public userId:UserInfoVO;
  public feeds:Observable<FeedRespVO[]>;
  public gallery:Observable<UserAlbumFileVO[]>;
  public videoThumbnail:Observable<UserAlbumFileVO[]>;
  @Input()
  get content(){
    return this._content;
  }
  set content(val){
    this._content = val
  }
  @ViewChild('videoModal') videoModal;
  subscription: Subscription = new Subscription();
  scrollContainer;
  constructor(
    public homepageService:HomepageService,
    public _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService,
  ) {
    this.feeds = this.homepageService.feeds;
    this.gallery = this.homepageService.gallery;
    this.videoThumbnail = this.homepageService.videoThumbnail;
    this._activatedRoute.params.subscribe((params:Params) => {
      this.userId = params['userId'];
      this.homepageService.getUserFeed(this.userId);
      this.homepageService.getUserAlbum(this.userId,2,1,1,9);
      this.homepageService.getUserAlbum(this.userId,3,1,1,9);
      this.scrollContainer = document.querySelector('#seed-scroll-content');
    })
  }


  showVideoView(src:string){
    if(!src)
      return;
    this.src = src;
    this.poster = src+'&width=300&second=1';
    this.videoModal.show();
    this.content.disableScroll();
  }



  ngOnInit() {

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
