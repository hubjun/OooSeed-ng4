/**
 * Created by dell on 2017/5/4.
 */
import {ChangeDetectionStrategy, ViewEncapsulation} from "@angular/core";
import {Component} from '@angular/core';
import {ToolsService} from "../../tools/tools.service";
@Component({
  selector: 'seed-toolbar-menu',
  template:
  `<button
    [class.unfold]="isUnfold"
    class="seed-toolbar-menu"
    (click)="onNavToggle()"
   >
  
  </button>`,
  changeDetection:ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarMenuComponent {
  public isUnfold:boolean;

  onNavToggle(){
    if (this.isUnfold){
      this.isUnfold = false;
    }else {
      this.isUnfold = true;
    }
    document.body.classList.toggle('unfold')
  }

}
