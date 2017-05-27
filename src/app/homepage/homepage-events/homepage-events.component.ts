import {Component, Input, OnInit} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'person-events',
  templateUrl: './homepage-events.component.html',
  styleUrls: ['./homepage-events.component.scss'],
})
export class HomepageEventsComponent implements OnInit {
  subscription: Subscription = new Subscription();
  public applying='../../../assets/icon/event_ongoing.png';
  public applyplay='../../../assets/icon/event_ongo.png';
  public applyend='../../../assets/icon/event_finished2.png';
  public beforeapply='../../../assets/icon/event_preheating.png';
  public nowdate:number;
  public eventList=[];
  scrollContainer;

  @Input() userid:string;
  constructor(
    public router: Router,
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  events(obj){
    this.subscription.add(
      this.homepageService.getEvents(obj).subscribe(res=>{
        let object=res;
        if(object&&object.data.list.length>0){
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
    this.router.navigate([`/homepage/${this.userid}/events-detail`],{queryParams:{matchId:a,status:b}});
  }
  ngOnInit() {
    this.nowdate=new Date().getTime();
    // if(this.userid==localStorage.getItem('userid')){
    //   this.events(this.userid);
    // }else{
    //   this.events(this.userid);
    // }
      this.events(this.userid);
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}

