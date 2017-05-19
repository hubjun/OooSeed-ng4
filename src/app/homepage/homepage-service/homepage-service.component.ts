import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HomepageService} from "../homepage.service";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'seed-homepage-service',
  templateUrl: './homepage-service.component.html',
  styleUrls: ['./homepage-service.component.scss'],
})
export class HomepageServiceComponent implements OnInit {
  public dealService:any;
  subscription: Subscription = new Subscription();
  scrollContainer;

  constructor(
    public homepageService:HomepageService,
    private _activatedRoute:ActivatedRoute,
    public ToolServices:ToolsService
  ) { }

  ngOnInit() {
    this._activatedRoute.params
      .subscribe((params:Params) => {
        this.subscription.add(
          this.homepageService.getService(params['userId']).subscribe(res => {
            if (res.result == 0) {
              this.dealService = res.data;
            }
          })
        )
      })
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
