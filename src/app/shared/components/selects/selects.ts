/**
 * Created by dell on 2017/5/8.
 */

import {ToolsService} from "../../tools/tools.service";
import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'select-list',
  template:`
    <select name=""class="selects" [ngModel]="selected"(ngModelChange)="changeselect($event)">
        <option *ngFor=" let option of options; let i =index" [selected]="option == selected">{{option}}</option>
      </select>
  `,
  styleUrls: ['./selects.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class SelectComponent {
  @Input() options:any;
  @Input() selected:any;
  @Output()change=new EventEmitter();
  constructor( public ToolServices:ToolsService) {

  }
  changeselect(event){
    this.change.emit(event);
    console.log(event)
  }
}
