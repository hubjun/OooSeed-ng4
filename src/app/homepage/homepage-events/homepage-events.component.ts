import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'events-rule',
  templateUrl: './homepage-events.component.html',
  styleUrls: ['./homepage-events.component.scss'],
})
export class HomepageEventsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  public applying='../../../assets/icon/event_ongoing.png';
  public applyplay='../../../assets/icon/event_preheating.png';
  public applyend='../../../assets/icon/event_end.png';
  public applyfinshed='../../../assets/icon/event_finished.png';
  public userId:string;
  public eventList=[];

  constructor(
    private router: Router,
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) { }

  events(obj){
    this.subscription.add(
      this.homepageService.getEvents(obj).subscribe(res=>{
        let object=res;
        if(object&&object.data.list){
          if(object.data.list.length>6){
            for(let i=0;i<6;i++){
              this.eventList[i]=object.data.list[i];
            }
          }else{
            this.eventList=object.data.list;
          }
        }else{
          this.eventList[0]='无';
        }
      })
    )
  }

  TipCommon(){
    this.ToolServices.presentConfirm('下载球苗APP，看更多精彩内容!');
  }
  routerDetail(a,b){
    this.router.navigate([`/homepage/${this.userId}/events-detail`],{queryParams:{matchId:a,status:b}});
  }
  ngOnInit() {
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        this.events(params['userId']);
        this.userId=params['userId'];
      })
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}

