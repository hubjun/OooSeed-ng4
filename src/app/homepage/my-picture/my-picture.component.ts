import { Component, OnInit } from '@angular/core';
import {ToolsService} from "../../shared/tools/tools.service";
import {HomepageService} from "../homepage.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'seed-my-picture',
  templateUrl: './my-picture.component.html',
  styleUrls: ['./my-picture.component.scss']
})
export class MyPictureComponent implements OnInit {
  public getPicture=[];
  scrollContainer;

  constructor(
    public homepageService:HomepageService,
    public toolsService:ToolsService,
    private _activatedRoute:ActivatedRoute,
  ) { }

  getmyPicture(obj:any){
    this.toolsService.showLoading();
      this.homepageService.getPeronPicture(obj).subscribe(res=> {
          let object=res;
          let list=object.data.list;
          if(object.result==0&&list){
            for(let i=0;i<list.length;i++){
              if(list[i].type==2){
                this.getPicture.push(list[i]);
              }
            }
          }
        this.toolsService.hideLoading();
      })
  }

  ngOnInit() {
    this.toolsService.setTitle('我的图片');
    this._activatedRoute.params
      .subscribe((params:Params) => {
          this.getmyPicture(params['userId']);
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
  ngOnDestroy() {
    //取消订阅
    // this.subscription.unsubscribe();
    this.toolsService.hideLoading();
  }

}
