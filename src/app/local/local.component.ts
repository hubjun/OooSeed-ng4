import { Component, OnInit } from '@angular/core';
import { LocalService } from './local.service';
import { ToolsService } from '../shared/tools/tools.service';
import { Router } from '@angular/Router';
import { DictCityVO } from '../domain/interface.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent {
  public subscription: Subscription = new Subscription();
  public currtetCityName: string = '定位中...';
  constructor(
    public localService: LocalService
  ) {
    this.subscription.add(
      this.localService.currentCityName.subscribe((cityName: string) => {
        this.currtetCityName = cityName;
      })
    )
  }
}
