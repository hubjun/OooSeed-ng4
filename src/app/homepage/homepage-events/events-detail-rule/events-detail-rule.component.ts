import {Component, Input, OnInit} from '@angular/core';
import {HomepageService} from "../../homepage.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'events-detail-rule',
  templateUrl: './events-detail-rule.component.html',
  styleUrls: ['./events-detail-rule.component.scss']
})
export class EventsDetailRuleComponent implements OnInit {
  public object;
  subscription: Subscription = new Subscription();
  @Input() objectParam:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  getRule(obj){
    this.subscription.add(
      this.homepageService.getRule(obj).subscribe(res=>{
        if(res.result==0&&res.data.constitution){
          this.object=res.data.constitution;
        }else{
          this.object={mark:'无'};
        }
      })
    )
  }
  ngOnInit() {
    this.getRule(this.objectParam);
  }
  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }

}
