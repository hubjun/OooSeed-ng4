import { Component, OnInit } from '@angular/core';
import {HomepageService} from "./homepage.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ToolsService} from "../shared/tools/tools.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public classTag:string='share';
  public personHeaderInfo:any;
  public uncare='../../assets/images/user_states_1.png';
  public cared='../../assets/images/user_states_2.png';
  public eachcare='../../assets/images/user_states_3.png';
  public userId:string='';
  public localUserId:string;
  scrollContainer;


  constructor(
    private router: Router,
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public toolsService:ToolsService,
  ) {

  }

  share(){
    this.classTag='share';
  }
  events(){
    this.classTag='events';
  }
  fans(){
    this.classTag='fans';
  }
  service(){
    this.classTag='service';
  }


  ngOnInit() {
    if(localStorage.getItem('userid')){
      this.localUserId='yes';
    }else{
      this.localUserId='';
    }
    this._activatedRoute.params
      .subscribe((params:Params) => {
      this.userId=params['userId'];
        this.homepageService.getPeronInfo(
          params['userId'])
          .subscribe(res=>{
          if(res.result==0){
            this.personHeaderInfo=res.data;
          }
        });
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

}
