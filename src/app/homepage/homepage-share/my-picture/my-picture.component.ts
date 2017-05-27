import { Component, OnInit } from '@angular/core';
import {ToolsService} from "../../../shared/tools/tools.service";
import {HomepageService} from "../../homepage.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {UserAlbumFileVO, UserInfoVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-my-picture',
  templateUrl: 'my-picture.component.html',
  styleUrls: ['my-picture.component.scss']
})
export class MyPictureComponent implements OnInit {
  public userId:UserInfoVO;
  public gallery:Observable<UserAlbumFileVO[]>;
  public scrollContainer:any;

  constructor(
    public homepageService:HomepageService,
    public toolsService:ToolsService,
    public _activatedRoute:ActivatedRoute,
  ) {
    this.gallery = this.homepageService.gallery;
  }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe((params:Params) => {
      this.userId = params['userId'];
        if(params['userId'])
          this.homepageService.getUserAlbum(params['userId'],2,1,1,30)
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }
  ngOnDestroy() {
    this.toolsService.hideLoading();
  }

}
