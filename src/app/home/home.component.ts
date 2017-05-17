import {Component, OnInit} from '@angular/core';
import {ToolsService} from "../shared/tools/tools.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(
    private tools:ToolsService
  ) {
      this.tools.setTitle('你好吗')
  }

  ngOnInit() {

  }

}
