import {Component, OnInit, ViewChild, ChangeDetectionStrategy, ElementRef, ViewEncapsulation} from '@angular/core';
import {HomeService} from "../../home.service";
import {ActivatedRoute, Params} from "@angular/router";
import {FeedRespVO, FeedCommentRespVO} from "../../../domain/interface.model";
import {Observable, Subscription} from "rxjs";
import {ToolsService} from "../../../shared/tools/tools.service";
import {UserDataService} from "../../../shared/tools/user-data.service";
import {FeedbackSevice} from "../../../shared/service/FeedbackSevice";

@Component({
  selector: 'seed-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit {
  public feedsArticle:Observable<FeedRespVO>;
  public comments:Observable<FeedCommentRespVO[]>;
  public scrollContainer;
  @ViewChild('diggNumber') diggNumber:ElementRef;
  course$: Observable<any>;
  subscription:Subscription = new Subscription();
  constructor(
    public route:ActivatedRoute,
    public tools:ToolsService,
    public homeService:HomeService,
    public user:UserDataService,
    public feedback:FeedbackSevice
  ) {
    this.feedsArticle = this.homeService.feedArticle;
    this.comments = this.homeService.feedComment;
  }

  digg(feedId:number,$event:any){
    let number = parseInt(this.diggNumber.nativeElement.innerText);
    let name = this.diggNumber.nativeElement.getAttribute('class');
    if(this.user.hasLoggedIn() != null && this.user.getUserid() != null){
      let userId = this.user.getUserid();

      if($event.target.classList.contains('isDigg')){
        this.subscription.add(
          this.homeService.GetFeedDigg(feedId,userId,false).subscribe((res) =>{
            if(!res)
              return;

            if(res.result == 0){
              $event.target.classList.remove('isDigg');
              this.diggNumber.nativeElement.innerText = number - 1;
              this.tools.showToast('取消成功',1000)
            }
          })
        )
      }else {
        this.subscription.add(
          this.homeService.GetFeedDigg(feedId,userId).subscribe((res) =>{
            if(!res)
              return;

            if(res.result == 0){
              $event.target.classList.add('isDigg');
              this.diggNumber.nativeElement.innerText = number + 1;
              this.tools.showToast('点赞成功',1000)
            }
          })
        )
      }
    }else {
      this.tools.showToast('登录之后才可进行此操作',1000)
    }

  }



  follow(followUserId:string,$event:any){
    console.log(followUserId)
    if(this.user.hasLoggedIn() != null && this.user.getUserid() !=null){

      if($event.target.classList.contains('isFollow')){
        this.subscription.add(
          this.feedback.GetFeedFierd(followUserId, false).subscribe((res) => {
            if (!res)
              return;
            $event.target.classList.remove('isFollow');
            if (res.result == 0) {
              this.tools.showToast(res.msg, 1000)
            }
          })
        );
      }else {
        this.subscription.add(
          this.feedback.GetFeedFierd(followUserId).subscribe((res) => {
            if (!res)
              return;
            $event.target.classList.add('isFollow');
            if (res.result == 0) {
              this.tools.showToast(res.msg, 1000)
            }
          })
        );
      }

    }else {
      this.tools.showToast('登录之后才可进行此操作',1000)
    }
  }


  ngOnInit() {
    this.route.params.subscribe((params:Params) => {
      this.homeService.GetFeedArticle(params['feedId']);
    })
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

}
