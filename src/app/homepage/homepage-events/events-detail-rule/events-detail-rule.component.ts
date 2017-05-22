import {Component, Input, OnInit} from '@angular/core';
import {HomepageService} from "../../homepage.service";
import {ToolsService} from "../../../shared/tools/tools.service";

@Component({
  selector: 'events-detail-rule',
  templateUrl: './events-detail-rule.component.html',
  styleUrls: ['./events-detail-rule.component.scss']
})
export class EventsDetailRuleComponent implements OnInit {
  public object;
  @Input() objectParam:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  getRule(obj){
    this.homepageService.getRule(obj).subscribe(res=>{
      if(res.result==0){
        this.object=res.msg;

      }
    })
  }
  ngOnInit() {
    this.getRule(this.objectParam);
  }

}
