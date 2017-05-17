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
  constructor(
    private localService: LocalService,
    private toolsService: ToolsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.toolsService.setTitle('定位中...');
    document.querySelector('seed-toolbar-header').addEventListener('click', (e) => {
      this.router.navigate(['/local/citys'])
    })
  }
}
