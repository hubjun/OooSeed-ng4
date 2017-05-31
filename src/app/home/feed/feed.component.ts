import {Component, OnInit, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {FeedRespVO} from "../../domain/interface.model";
import {HomeService} from "../home.service";
import {Observable} from "rxjs";

@Component({
  selector: 'seed-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class FeedComponent implements OnInit {
  public feeds:Observable<FeedRespVO[]>;
  constructor(
    public homeService:HomeService
  ) {
    this.feeds = this.homeService.feeds;
  }

  ngOnInit() {
    this.homeService.GetFeedForGuest();
  }

}
