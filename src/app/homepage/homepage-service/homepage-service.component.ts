import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {HomepageService} from "../homepage.service";
import {Subscription} from "rxjs/Subscription";
import {ToolsService} from "../../shared/tools/tools.service";

@Component({
  selector: 'person-service',
  templateUrl: './homepage-service.component.html',
  styleUrls: ['./homepage-service.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomepageServiceComponent implements OnInit {
  public dealService:any;
  subscription: Subscription = new Subscription();
  scrollContainer;

  @Input() userid:string;
  constructor(
    public homepageService:HomepageService,
    public ToolServices:ToolsService
  ) { }

  ngOnInit() {
    this.subscription.add(
      this.homepageService.getService(this.userid).subscribe(res => {
        if (res.result == 0) {
          this.dealService = res.data;
        }
      })
    );
    this.scrollContainer = document.querySelector('#seed-scroll-content');
  }

  ngOnDestroy() {
    //取消订阅
    this.subscription.unsubscribe();
  }
}
