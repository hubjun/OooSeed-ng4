import { Component, OnInit } from '@angular/core';
import {LocalService} from "../../local/local.service";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'seed-my-spell',
  templateUrl: './my-spell.component.html',
  styleUrls: ['./my-spell.component.scss']
})
export class MySpellComponent implements OnInit {
  public classTag='LaunchClass';
  constructor(
    public localService:LocalService,
    public toolsService: ToolsService,
  ) { }

  myLaunch(){
    this.classTag='LaunchClass';
  }
  myActivities(){
    this.classTag='activitiesClass';
  }

  ngOnInit() {
    this.toolsService.setTitle('我的拼球')
  }


}
