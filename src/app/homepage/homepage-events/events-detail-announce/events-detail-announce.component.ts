import {Component, Input, OnInit} from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {HomepageService} from "../../homepage.service";

@Component({
  selector: 'events-detail-announce',
  templateUrl: './events-detail-announce.component.html',
  styleUrls: ['./events-detail-announce.component.scss']
})
export class EventsDetailAnnounceComponent implements OnInit {
  public object=[];

  @Input() objectParam:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  getAnnounce(obj){
    this.homepageService.getAnnounce(obj).subscribe(res=>{
      if(res.result==0&&res.data.list){
        this.object=res.data.list;
      }else{
        this.object[0]='无';
      }
    })
  }
  ngOnInit() {
    this.getAnnounce(this.objectParam);
  }

}
