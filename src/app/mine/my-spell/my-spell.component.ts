import { Component, OnInit } from '@angular/core';
import {ToolsService} from "../../shared/tools/tools.service";
import {MineService} from "../mine.service";

@Component({
  selector: 'seed-my-spell',
  templateUrl: './my-spell.component.html',
  styleUrls: ['./my-spell.component.scss']
})
export class MySpellComponent implements OnInit {
  public classTag:string;

  constructor(
    public toolsService: ToolsService,
    public mineService:MineService
  ) { }

  myLaunch(){
    this.classTag='LaunchClass';
    this.mineService.saveClassTag='LaunchClass';
  }
  myActivities(){
    this.classTag='activitiesClass';
    this.mineService.saveClassTag='activitiesClass';
  }

  ngOnInit() {
    this.toolsService.setTitle('我的拼球');
    this.classTag=this.mineService.saveClassTag;
  }


}
