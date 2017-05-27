import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ToolsService} from "../shared/tools/tools.service";
import {Content} from "../shared/components/toolbar/toolbar-content";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild(Content) contentEle;
  constructor(
    public tools:ToolsService
  ) {
      this.tools.setTitle('资讯')
  }

  onScroll(){
    console.log('=============')
  }
  ngOnInit() {

      console.log(this.contentEle)


  }

}
