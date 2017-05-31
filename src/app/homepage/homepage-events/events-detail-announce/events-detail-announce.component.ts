import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {HomepageService} from "../../homepage.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'events-detail-announce',
  templateUrl: './events-detail-announce.component.html',
  styleUrls: ['./events-detail-announce.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsDetailAnnounceComponent implements OnInit {
  public object=[];
  subscription: Subscription = new Subscription();

  @Input() objectParam:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  getAnnounce(obj){
    this.subscription.add(
      this.homepageService.getAnnounce(obj).subscribe(res=>{
        if(res.result==0&&res.data.list.length>0){
          this.object=res.data.list;
        }else{
          this.object[0]='无';
        }
      })
    )
  }
  ngOnInit() {
    this.getAnnounce(this.objectParam);
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
