import { Component, OnInit,Input } from '@angular/core';
import {HomepageService} from "../../homepage.service";
import {ToolsService} from "../../../shared/tools/tools.service";

@Component({
  selector: 'events-detail-detail',
  templateUrl: './events-detail-detail.component.html',
  styleUrls: ['./events-detail-detail.component.scss']
})
export class EventsDetailDetailComponent implements OnInit {
  public eventsDetail;
  public detail;

  @Input() objectParam:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  getDetailDetail(obj){
    this.homepageService.getDetail(obj).subscribe(res=>{
      let object=res;
      if(object.result==0&&object.data){
        this.eventsDetail=object.data;
        this.detail=this.eventsDetail.details;
      }
    })
  }

  ngOnInit() {
    this.getDetailDetail(this.objectParam);
  }

}
