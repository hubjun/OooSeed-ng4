/**
 * Created by dell on 2017/5/8.
 */

import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';
import {ToolsService} from "../../tools/tools.service";

@Component({
  selector: 'go-down-app',
  template:`
    <div class="contentLook"(click)="TipCommon()">
      <div class="lookMore">下载球苗App，看更多精彩内容</div>
    </div>
  `,
  styleUrls: ['./go-down-app.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class DownAppComponent {

  constructor( public ToolServices:ToolsService) {

  }
  TipCommon(){
    this.ToolServices.presentConfirm('下载求苗APP，看更多精彩内容！');
  }
}
