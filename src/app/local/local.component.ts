import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LocalService } from './local.service';
import { ToolsService } from '../shared/tools/tools.service';
import { Router } from '@angular/Router';
import { DictCityVO } from '../domain/interface.model';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LocalComponent {
  public currtetCityName: string = '定位中...';
  public ngUnsubscribe: Subject<void> = new Subject<void>();
  constructor(
    public localService: LocalService
  ) {
    this.localService.currentCityName.takeUntil(this.ngUnsubscribe).subscribe((cityName: string) => {
      this.currtetCityName = cityName;
    })
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
