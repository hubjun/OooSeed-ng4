import {
  Component,
  EventEmitter,
  ElementRef,
  OnDestroy,
  ViewChild,
  Input,
  Output,
  ChangeDetectionStrategy, ViewEncapsulation,
} from '@angular/core';
import {ToolsService} from "../../tools/tools.service";
import {Subject} from "rxjs";
import {UserDataService} from "../../tools/user-data.service";
import {HomeService} from "../../../home/home.service";
import {FeedCommentRespVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CommentsComponent implements OnDestroy {
  @Input() comments:FeedCommentRespVO[];
  @Output() digg: EventEmitter<number> = new EventEmitter<number>();
  @ViewChild('commentDigg') commentDigg:ElementRef;
  unSubscription:Subject<void> = new Subject<void>();
  scrollContainer;

  constructor(
    public user:UserDataService,
    public tools:ToolsService,
    public homeService:HomeService
  ) {}

  loadComments(commentId:number,$event){
    if(!commentId )
      return;
    let quantity = $event.target.parentNode.getElementsByClassName('quantity')[0];
    //let quantity = $event.target.parentNode.innerText;
    let number = parseInt(quantity.innerText);


    if(this.user.hasLoggedIn() != null && this.user.getUserid() != null){
      let userId = this.user.getUserid();
      if($event.target.classList.contains('isDigg')){
          this.homeService.GetFeedArticleCommentDigg(commentId,userId,false)
            .takeUntil(this.unSubscription)
            .subscribe((res) =>{
            if(!res)
              return;
            if(res.result == 0){
              $event.target.classList.remove('isDigg');
              quantity.innerText = number - 1;
              this.tools.showToast('取消成功',1000)
            }
          })
      }else {
          this.homeService.GetFeedArticleCommentDigg(commentId,userId,true)
            .takeUntil(this.unSubscription)
            .subscribe((res) =>{
            if(!res)
              return;
            if(res.result == 0){
              $event.target.classList.add('isDigg');
              quantity.innerText = number + 1;
              this.tools.showToast('点赞成功',1000)
            }
          })
      }
    }else {
      this.tools.showToast('登录之后才可进行此操作',1000)
    }
  }

  ngOnInit(){
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    this.unSubscription.next();
    this.unSubscription.complete();
  }

}
