import { Component, OnInit } from '@angular/core';
import {HomepageService} from "../../homepage.service";
import {ToolsService} from "../../../shared/tools/tools.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Observable} from "rxjs";
import {FeedRespVO} from "../../../domain/interface.model";

@Component({
  selector: 'seed-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.scss']
})
export class MyFeedComponent implements OnInit {
  private userId;
  public scrollContainer:any;
  public feeds:Observable<FeedRespVO[]>;
  constructor(
    public homepageService:HomepageService,
    public toolsService:ToolsService,
    private _activatedRoute:ActivatedRoute,
  ) {
    this.feeds = this.homepageService.feeds;
  }

  ngOnInit() {
    this._activatedRoute.parent.params
      .subscribe((params:Params) => {
        this.userId = params['userId'];
        if(params['userId'])
          this.homepageService.getUserFeed(this.userId,1,10);
      });
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

}
