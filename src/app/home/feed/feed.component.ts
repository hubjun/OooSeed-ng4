import { Component, OnInit } from '@angular/core';
import {FeedRespVO} from "../../domain/interface.model";
import {HomeService} from "../home.service";
import {Observable} from "rxjs";

@Component({
  selector: 'seed-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {
  private feeds:Observable<FeedRespVO[]>;
  constructor(
    private homeService:HomeService
  ) {
    this.feeds = this.homeService.feeds;
  }

  ngOnInit() {
    this.homeService.GetFeedForGuest();
  }

}
