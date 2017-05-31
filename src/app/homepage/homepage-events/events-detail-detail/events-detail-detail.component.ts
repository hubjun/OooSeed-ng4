import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {HomepageService} from "../../homepage.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'events-detail-detail',
  templateUrl: './events-detail-detail.component.html',
  styleUrls: ['./events-detail-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EventsDetailDetailComponent implements OnInit {
  public eventsDetail;
  public detail;
  subscription: Subscription = new Subscription();

  @Input() objectParam:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  getDetailDetail(obj){
    this.subscription.add(
      this.homepageService.getDetail(obj).subscribe(res=>{
        let object=res;
        if(object.result==0&&object.data){
          this.eventsDetail=object.data;
        }else{
          this.eventsDetail='无';
        }
      })
    )
  }

  ngOnInit() {
    this.getDetailDetail(this.objectParam);
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
