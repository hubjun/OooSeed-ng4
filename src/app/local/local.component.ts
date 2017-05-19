import { Component, OnInit } from '@angular/core';
import { LocalService } from './local.service';
import { ToolsService } from '../shared/tools/tools.service';
import { Router } from '@angular/Router';
import { DictCityVO } from '../domain/interface.model';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit {
  public target = document.querySelector('seed-toolbar-header');
  constructor(
    private localService: LocalService,
    private toolsService: ToolsService,
    private router: Router
  ) {

  }

  redirectToFilterr () {
  console.log('=======')

    document.querySelector('seed-toolbar-header')
      .removeEventListener('click',this.redirectToFilterr,false)
    this.router.navigate(['/local/citys']);
}
  ngOnInit() {
    this.toolsService.setTitle('定位中...');
    let that = this;

    document.querySelector('seed-toolbar-header').addEventListener('click',this.redirectToFilterr.bind(this),true);

  }
  ngOnDestroy(){
    console.log('----------------------')

  }
}
