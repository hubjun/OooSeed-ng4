import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HomepageService} from "../../homepage.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'seed-events-detail',
  templateUrl: './events-detail.component.html',
  styleUrls: ['./events-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsDetailComponent implements OnInit {
  activatedRoute: any;
  public eventClass:string='detail';
  public matchId:string;
  public status:string;
  public detailHeader:any;
  public userId:string;
  subscription: Subscription = new Subscription();
  scrollContainer;

  constructor(
    public router: Router,
    public _activatedRoute:ActivatedRoute,
    public homepageService:HomepageService,
    public route: ActivatedRoute,
    public ToolServices:ToolsService

  ) { }

  evntsDetail(){
    this.eventClass='detail';
  }
  evntsRule(){
    this.eventClass='rule';
  }
  evntsAnnounce(){
    this.eventClass='announce';
  }
  TipCommon(){
    if(this.status=='4'){
      this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
    }
  }

  getEventDetail(obj){
    this.subscription.add(
      this.homepageService.getDetailHeader(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data){
          this.detailHeader=object.data;
        }
      })
    )
  }

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(param=>{
        this.matchId=param.matchId;
        this.status=param.status;
        this.getEventDetail(param.matchId);
      })
     );
    this.subscription.add(
      this._activatedRoute.parent.params
        .subscribe((params:Params) => {
          this.userId=params['userId'];
        })
    );
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
